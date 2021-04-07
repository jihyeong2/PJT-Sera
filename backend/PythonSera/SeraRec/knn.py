# from database import *
from SeraRec.database import *
import tqdm
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import numpy as np
import collections

def selectSpecialElement():
    connect, curs = connectMySQL()
    query = """SELECT distinct element_korean_name FROM helpful INNER JOIN element USING(element_id)"""
    curs.execute(query)
    helpful_elements = curs.fetchall()
    query = """SELECT distinct element_korean_name FROM caution INNER JOIN element USING(element_id)"""
    curs.execute(query)
    caution_elements = curs.fetchall()
    connect.close()
    helpful = []
    caution = []
    for h in helpful_elements:
        helpful.append(h[0])
    for c in caution_elements:
        caution.append(c[0])
    return helpful, caution

def selectAllItem():
    connect, curs = connectMySQL()
    query = """SELECT item_id, item_name, item_img, item_brand, item_volume, item_price, item_description, item_colors, category_large, category_middle, category_small, dibs_cnt
            FROM item INNER JOIN category USING(category_id)
            ORDER BY item_id"""
    curs.execute(query)
    items = curs.fetchall()
    connect.close()
    return items

def selectItemTag(item_id, connect, curs):
    query = """SELECT tag_name FROM item_tag INNER JOIN tag USING(tag_id) WHERE item_id = %s"""
    curs.execute(query, (item_id))
    tags = curs.fetchall()
    result = []
    for tag in tags:
        result.append(tag[0])
    return sorted(result)

def selectDibs(user_id, item_id, connect, curs):
    query = """SELECT dibs_id FROM dibs WHERE user_id=%s AND item_id=%s"""
    curs.execute(query, (user_id,item_id))
    tags = curs.fetchone()
    result = True
    if tags is None:
        result = False
    return result

def writeElementByItem():
    connect, curs = connectMySQL()
    query = """SELECT item_id, element_korean_name
            FROM item_element INNER JOIN element USING(element_id)
            ORDER BY item_id"""
    curs.execute(query)
    elements = curs.fetchall()
    connect.close()
    e_dic = {}
    for (i, e) in elements:
        if i not in e_dic.keys():
            e_dic.setdefault(i, [])
        e_dic[int(i)].append(e)
    path = '../crawling/data/GP/item_element.json'
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(e_dic, f, ensure_ascii=False, indent="\t")

def selectElementByItem():
    path = '../crawling/data/GP/item_element.json'
    with open(path, 'r', encoding='utf-8') as f:
        item_element = json.load(f)
    return item_element

def selectUser(user_id, connect, curs):
    query = """SELECT * FROM user WHERE user_id = %s"""
    curs.execute(query, (user_id))
    user = curs.fetchone()
    user_info = {}
    feilds = ['user_id', 'user_login_id', 'user_password', 'user_nickname', 'user_age', 'user_phone', 'user_gender', 'skin_id', 'personal_color', 'user_img']
    for (feild, info) in zip(feilds, user):
        user_info[feild] = info
    return user_info

def selectElementForDetail(item_id, skin_id, connect, curs):
    query = """SELECT e.*, CASE WHEN element_id IN (SELECT element_id FROM helpful WHERE skin_id=%s)
                            THEN 1
                            WHEN element_id IN (SELECT element_id FROM caution WHERE skin_id=%s)
                            THEN -1
                            ELSE 0
                            END as correct
                FROM element e INNER JOIN item_element ie USING(element_id) WHERE ie.item_id = % s """
    curs.execute(query, (skin_id, skin_id, item_id))
    elements = curs.fetchall()
    element_result = []
    if len(elements) > 0:
        feilds = ['element_id', 'element_korean_name', 'element_english_name', 'element_purpose', 'element_level', 'correct']
        for e in elements:
            element_json = {}
            for (i, f) in zip(e, feilds):
                element_json[f] = i
            element_result.append(element_json)
    return element_result

def makeSkinVector():
    helpful, caution = selectSpecialElement()
    specialElement = set()
    for h in helpful:
        specialElement.add(h)
    for c in caution:
        specialElement.add(c)
    specialElement = sorted(list(specialElement))
    skin_vector = []
    connect, curs = connectMySQL()
    for i in tqdm.tqdm(range(1,17)):
        query = """SELECT element_korean_name FROM helpful INNER JOIN element USING(element_id) WHERE skin_id = %s"""
        curs.execute(query,(i))
        helpful_elements = curs.fetchall()
        query = """SELECT element_korean_name FROM caution INNER JOIN element USING(element_id) WHERE skin_id = %s"""
        curs.execute(query, (i))
        caution_elements = curs.fetchall()

        vector = np.zeros(len(specialElement))
        for e in helpful_elements:
            vector[specialElement.index(e[0])] = 2
        for e in caution_elements:
            vector[specialElement.index(e[0])] = -2
        skin_vector.append(vector)
    connect.close()
    data = np.stack(skin_vector)
    np.save('../crawling/data/GP/skin_np', data)

def makeitemVector():
    items = selectAllItem()
    helpful, caution = selectSpecialElement()
    item_element = selectElementByItem()
    
    specialElement = set()
    for h in helpful:
        specialElement.add(h)
    for c in caution:
        specialElement.add(c)
    specialElement = sorted(list(specialElement))
    item_vector = []
    item_idx = []
    for item in items:
        item_id = item[0]
        vector = np.zeros(len(specialElement))
        if str(item_id) in item_element.keys() :
            for i, e in enumerate(specialElement):
                if e in item_element[str(item_id)]:
                    vector[i] = 2
        # print(vector)
        item_vector.append(vector)
        item_idx.append(item_id)
    data = np.stack(item_vector)
    np.save('../crawling/data/GP/item_np', data)

def makeReviewVector():
    item_df = getItemNumpy()
    reviews = loadJsonReview()
    item_idx = getItemIdx()
    gender_dic = {"남":1, "여":-1}
    age_gender_score = {}

    for review in tqdm.tqdm(reviews):
        item = review["item"]
        age = review["age"]//10
        gender = review["gender"]
        score = review["score"]
        age_gender_score.setdefault(tuple([item, age, gender]), [])
        age_gender_score[tuple([item, age, gender])].append(score)

    items = {}
    review_vec = np.empty((0, item_df.shape[1] + 3), dtype=float)
    idx = 0
    for (item, age, sex), scores in tqdm.tqdm(age_gender_score.items()):
        vector = item_df[item_idx[item],:]
        vector = np.append(vector, np.array([age, gender_dic[sex], sum(scores)/len(scores)]))
        review_vec = np.append(review_vec, vector.reshape(1, -1), axis=0)
        items[idx] = item
        idx += 1
    np.save('../crawling/data/GP/review_np', review_vec)
    with open('../crawling/data/GP/review_item.json', 'w', encoding="utf-8") as of:
        json.dump(items, of, ensure_ascii=False, indent="\t")

def makeVector():
    item_np = getItemNumpy()
    review_np = getReviewNumPy()
    review_idx = getReviewItemIdx()
    item_idx = getItemIdx()
    review_item_idx = set()
    for review_id, reveiw_item in review_idx.items():
        review_item_idx.add(reveiw_item)
    add_item = []
    for item_id in item_idx.keys():
        if item_id in review_item_idx: continue
        add_item.append(item_id)
    vec = review_np
    start_idx = len(review_idx)
    for id in tqdm.tqdm(add_item):
        vector = item_np[item_idx[id],:]
        vector = np.append(vector, np.array([3, 0, 0]))
        vec = np.append(vec, vector.reshape(1, -1), axis=0)
        review_idx[start_idx] = id
        start_idx += 1
    np.save('../crawling/data/GP/vec_np', vec)
    with open('../crawling/data/GP/vec_idx.json', 'w', encoding="utf-8") as of:
        json.dump(review_idx, of, ensure_ascii=False, indent="\t")

def getItemNumpy():
    # path = '../crawling/data/GP/item_np.npy'
    path = './crawling/data/GP/item_np.npy'
    item_np = np.load(path)
    return item_np

def getReviewNumPy():
    # path = '../crawling/data/GP/review_np.npy'
    path = './crawling/data/GP/review_np.npy'
    review_np = np.load(path)
    return review_np

def getVectorNumPy():
    # path = '../crawling/data/GP/vec_np.npy'
    path = './crawling/data/GP/vec_np.npy'
    vec_np = np.load(path)
    return vec_np

def getReviewItemIdx():
    path = '../crawling/data/GP/review_item.json'
    reveiw_item_json = {}
    with open(path, 'r', encoding='utf-8') as f:
        reveiw_item_json = json.load(f)
    return reveiw_item_json

def getItemIdx():
    items = selectAllItem()
    item_id_dict = {}
    for i, item in enumerate(items):
        item_id_dict[item[0]] = i
    return item_id_dict

def getVecIdx():
    # path = '../crawling/data/GP/vec_idx.json'
    path = './crawling/data/GP/vec_idx.json'
    vec_idx = {}
    with open(path, 'r', encoding='utf-8') as f:
        vec_idx = json.load(f)
    return vec_idx

def getSkinNumpy():
    # path = '../crawling/data/GP/skin_np.npy'
    path = './crawling/data/GP/skin_np.npy'
    skin_np = np.load(path)
    return skin_np

def knn(neighbor_cnt, user, category_large=None, category_middle = None, connect=None, curs=None):
    vec_np = getVectorNumPy()
    skin_np = getSkinNumpy()
    vec_idx = getVecIdx()
    vec_item = {}
    for idx, id in vec_idx.items():
        vec_item[id] = int(idx)
    input = skin_np[user['skinType']-1,:]
    age = user['age'] // 10
    gender = -1 if user['gender'] == '여' else 1

    input = np.append(input, np.array([age,gender,5]))
    neigh = NearestNeighbors(n_neighbors=neighbor_cnt)
    data_idx = {}
    data_np = np.empty((0, vec_np.shape[1]), dtype=float)
    if category_large is None and category_middle is None:
        data_np = vec_np
        data_idx = vec_idx
    else:
        item_idx = []
        if category_large is not None and category_middle is None:
            query = """SELECT item_id FROM item INNER JOIN category USING(category_id) WHERE category_large=%s"""
            curs.execute(query, (category_large))
            item_ids = curs.fetchall()   
        elif category_large is not None and category_middle is not None:
            query = """SELECT item_id FROM item INNER JOIN category USING(category_id) WHERE category_large=%s AND category_middle=%s"""
            curs.execute(query, (category_large, category_middle))
            item_ids = curs.fetchall()
        for i, item in enumerate(item_ids):
            item_idx.append(vec_item[item[0]])
            data_idx[str(i)] = item[0]
        data_np = vec_np[item_idx,:]
    neigh.fit(data_np)
    rec_items = []
    rec_correctRate = []
    result = neigh.kneighbors([input])
    input[-1] = input[-2] = input[-3] = 0
    for i, index in enumerate(result[1][0]):
        if data_idx[str(index)] not in rec_items:
            rec_items.append(data_idx[str(index)])
            correct_vec = data_np[index,:] * input
            help_cnt, caution_cnt = calCorrectRate(correct_vec,'knn')
            rec_correctRate.append([help_cnt, caution_cnt])
    return rec_items, rec_correctRate

def search(user, keyword, category_large=None, connect=None, curs=None):
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    etc = ['helpful_cnt','caution_cnt']
    query = """SELECT count(*) FROM item WHERE item_name like %s"""
    curs.execute(query, ('%' + keyword + '%'))
    item_cnt = curs.fetchone()
    if item_cnt[0] > 0:
        if category_large is None:
            query = """SELECT i.*, c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND i.item_name LIKE %s
                    ORDER BY si.helpful_cnt - si.caution_cnt DESC
                    LIMIT 100 """
            curs.execute(query, (user['skin_id'], '%' + keyword + '%'))
        else:
            query = """SELECT i.*, c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND i.item_name LIKE %s AND c.category_large = %s
                    ORDER BY si.helpful_cnt - si.caution_cnt DESC
                    LIMIT 100 """
            curs.execute(query, (user['skin_id'], '%' + keyword + '%', category_large))
        items = curs.fetchall()
        result_item_name = []
        for item in items:
            item_json = {}
            for (d, f) in zip(item[:10], fields):
                item_json[f] = d
            for (d, f) in zip(item[10:14], category_fields):
                item_json[f] = d
            for (d, f) in zip(item[14:], etc):
                item_json[f] = d
            item_json['rating'] = item_json['helpful_cnt'] - item_json['caution_cnt']
            item_json['dibs'] = selectDibs(user['user_id'], item[0], connect, curs)
            result_item_name.append(item_json)
    else:
        result_item_name = []
    query = """SELECT count(*) FROM element WHERE element_korean_name like %s"""
    curs.execute(query, ('%' + keyword + '%'))
    element_cnt = curs.fetchone()
    if element_cnt[0] > 0:
        query = """SELECT distinct element_id, element_korean_name FROM element WHERE element_korean_name like %s LIMIT 100"""
        curs.execute(query, ('%' + keyword + '%'))
        elements = curs.fetchall()
        result_item_element = {}
        for e in tqdm.tqdm(elements):
            result_item_element[e[1]] = []
            if category_large is None:
                query = """SELECT i.*, c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                        WHERE si.skin_id = %s AND item_id in (SELECT item_id FROM item_element WHERE element_id = %s)
                        ORDER BY si.helpful_cnt - si.caution_cnt DESC
                        LIMIT 100 """
                curs.execute(query, (user['skin_id'], e[0]))
            else:
                query = """SELECT i.*, c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                        WHERE si.skin_id = %s AND item_id in (SELECT item_id FROM item_element WHERE element_id = %s) AND c.category_large = %s
                        ORDER BY si.helpful_cnt - si.caution_cnt DESC
                        LIMIT 100 """
                curs.execute(query, (user['skin_id'], e[0], category_large))
            items = curs.fetchall()
            for item in items:
                item_json = {}
                for (d, f) in zip(item[:10], fields):
                    item_json[f] = d
                for (d, f) in zip(item[10:14], category_fields):
                    item_json[f] = d
                for (d, f) in zip(item[14:], etc):
                    item_json[f] = d
                item_json['rating'] = item_json['helpful_cnt'] - item_json['caution_cnt']
                item_json['dibs'] = selectDibs(user['user_id'], item[0], connect, curs)
                result_item_element[e[1]].append(item_json)
    else:
        result_item_element = {}
    return result_item_name, result_item_element

def sort(user, type=None, subType=None, category_large=None, category_middle = None, connect=None, curs=None):
    low = """ORDER BY CAST(REPLACE(REPLACE(item_price, '원',''),',','') AS UNSIGNED) ASC, helpful_cnt-caution_cnt DESC 
            limit 100 """
    high = """ORDER BY CAST(REPLACE(REPLACE(item_price, '원',''),',','') AS UNSIGNED) DESC, helpful_cnt-caution_cnt DESC 
            limit 100"""
    if type == 'price':
        if category_large is not None and category_middle is None:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s AND i.item_price != '가격미정' """
            if subType == 'low':
                query += low
                curs.execute(query, (user['skin_id'], category_large))
            else:
                query += high
                curs.execute(query, (user['skin_id'], category_large))
        elif category_large is not None and category_middle is not None:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s AND c.category_middle = %s AND i.item_price != '가격미정' """
            if subType == 'low':
                query += low
                curs.execute(query, (user['skin_id'], category_large, category_middle))
            else:
                query += high
                curs.execute(query, (user['skin_id'], category_large, category_middle))
        else:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND i.item_price != '가격미정' """
            if subType == 'low':
                query += low
                curs.execute(query, (user['skin_id']))
            else:
                query += high
                curs.execute(query, (user['skin_id']))
    elif type == 'reviewCnt':
        if category_large is not None and category_middle is None:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s
                    ORDER BY (SELECT COUNT(*) FROM review WHERE item_id=i.item_id) DESC, helpful_cnt-caution_cnt DESC 
                    LIMIT 100 """
            curs.execute(query, (user['skin_id'], category_large))
        elif category_large is not None and category_middle is None:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s AND c.category_middle = %s
                    ORDER BY (SELECT COUNT(*) FROM review WHERE item_id=i.item_id) DESC, helpful_cnt-caution_cnt DESC 
                    LIMIT 100 """
            curs.execute(query, (user['skin_id'], category_large, category_middle))
        else:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                        WHERE si.skin_id = %s
                        ORDER BY (SELECT COUNT(*) FROM review WHERE item_id=i.item_id) DESC, helpful_cnt-caution_cnt DESC 
                        LIMIT 100 """
            curs.execute(query, (user['skin_id']))
    elif type == 'score':
        if category_large is not None and category_middle is None:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s
                    ORDER BY (SELECT AVG(review_score) FROM review WHERE item_id=i.item_id GROUP BY item_id) DESC, helpful_cnt-caution_cnt DESC 
                    LIMIT 100 """
            curs.execute(query, (user['skin_id'], category_large))
        elif category_large is not None and category_middle is not None:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s AND c.category_middle = %s
                    ORDER BY (SELECT AVG(review_score) FROM review WHERE item_id=i.item_id GROUP BY item_id) DESC, helpful_cnt-caution_cnt DESC 
                    LIMIT 100"""
            curs.execute(query, (user['skin_id'], category_large, category_middle))
        else:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s
                    ORDER BY (SELECT AVG(review_score) FROM review WHERE item_id=i.item_id GROUP BY item_id) DESC, helpful_cnt-caution_cnt DESC 
                    LIMIT 100"""
            curs.execute(query, (user['skin_id']))

    items = curs.fetchall()
    data = []
    data = makeItemList(items, user, connect, curs)
    return data

def correct(user, category_large = None, type=None, connect=None, curs=None):
    if category_large is None:
        if type == 'helpful':
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                        WHERE si.skin_id = %s
                        ORDER BY si.helpful_cnt DESC, si.caution_cnt ASC
                        LIMIT 100 """
        else:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                        WHERE si.skin_id = %s
                        ORDER BY si.caution_cnt DESC, si.helpful_cnt ASC
                        LIMIT 100 """
        curs.execute(query, (user['skin_id']))
    else:
        if type == 'helpful':
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                    WHERE si.skin_id = %s AND c.category_large = %s AND si.caution_cnt = 0
                    ORDER BY si.helpful_cnt DESC, si.caution_cnt ASC
                    LIMIT 100 """
        else:
            query = """SELECT i.*,c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                        WHERE si.skin_id = %s AND c.category_large = %s
                        ORDER BY si.caution_cnt DESC, si.helpful_cnt ASC
                        LIMIT 100 """
        curs.execute(query, (user['skin_id'], category_large))
    items = curs.fetchall()
    data = makeItemList(items, user, connect, curs)
    return data

def dibsItemList(user, connect, curs):
    query = """SELECT i.*, c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
            WHERE si.skin_id = %s AND item_id in (SELECT item_id FROM dibs WHERE user_id = %s)"""
    curs.execute(query, (user['skin_id'], user['user_id']))
    items = curs.fetchall()
    data = makeItemList(items, user, connect, curs)
    return data

def makeItemList(items, user, connect, curs):
    data = []
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    etc = ['helpful_cnt','caution_cnt']
    for item in items:
        item_json = {}
        for (d, f) in zip(item[:10], fields):
            item_json[f] = d
        for (d, f) in zip(item[10:14], category_fields):
            item_json[f] = d
        for (d, f) in zip(item[14:], etc):
            item_json[f] = d
        item_json['rating'] = item_json['helpful_cnt'] - item_json['caution_cnt']
        item_json['dibs'] = selectDibs(user['user_id'], item[0], connect, curs)
        data.append(item_json)
    return data

# 일치율 계산
def calCorrectRate(vec, type=None):
    count = collections.Counter(vec)
    help_cnt = count[4]
    caution_cnt = count[-4]
    return help_cnt, caution_cnt

def updateVector():
    makeReviewVector()
    makeVector()

def insertItemSkin():
    item_np = getItemNumpy()
    skin_np = getSkinNumpy()
    item_idx = getItemIdx()
    idx_item = {}
    for id, idx in item_idx.items():
        idx_item[idx] = int(id)
    for skin_idx in range(skin_np.shape[0]):
        skin = skin_np[skin_idx,:]
        input_np = skin * item_np
        for idx in tqdm.tqdm(range(input_np.shape[0])):
            helpful_cnt, caution_cnt = calCorrectRate(input_np[idx,:])
            item_id = idx_item[idx]
            query = """INSERT INTO item_skin (item_id, skin_id, helpful_cnt, caution_cnt)
                        VALUES(%s, %s, %s, %s) """
            curs.execute(query, (item_id, skin_idx + 1, helpful_cnt, caution_cnt))
            connect.commit()

if __name__ == '__main__':
    # print(knn({'skinType': 1, 'age': 25, 'gender': '여'}))
    # makeVector()
    updateVector()
    # insertItemSkin()