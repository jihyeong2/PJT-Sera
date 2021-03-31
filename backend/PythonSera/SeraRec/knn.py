from SeraRec.database import *
import tqdm
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import numpy as np

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
        vector = np.append(vector, np.array([3, 0, 5]))
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

def knn(user, category_large=None, category_middle = None):
    vec_np = getVectorNumPy()
    skin_np = getSkinNumpy()
    vec_idx = getVecIdx()
    vec_item = {}
    for idx, id in vec_idx.items():
        vec_item[id] = int(idx)
    input = skin_np[user['skinType']-1,:]
    age = user['age'] // 10
    gender = -1 if user['gender'] == '여' else 1

    connect, curs = connectMySQL()
    query = """SELECT count(*) FROM helpful WHERE skin_id = %s"""
    curs.execute(query, (user['skinType']))
    helpful_cnt = curs.fetchone()
    query = """SELECT count(*) FROM caution WHERE skin_id = %s"""
    curs.execute(query, (user['skinType']))
    caution_cnt = curs.fetchone()
    connect.close()

    input = np.append(input, np.array([age,gender,5]))
    neigh = NearestNeighbors(n_neighbors=100)
    # neigh.fit(vec_np)
    data_idx = {}
    data_np = np.empty((0, vec_np.shape[1]), dtype=float)
    if(category_large == None and category_middle == None):
        data_np = vec_np
        data_idx = vec_idx
    else:
        connect, curs = connectMySQL()
        item_idx = []
        if (category_large != None and category_middle == None):
            query = """SELECT item_id FROM item INNER JOIN category USING(category_id) WHERE category_large=%s"""
            curs.execute(query, (category_large))
            item_ids = curs.fetchall()   
        elif (category_large != None and category_middle != None):
            query = """SELECT item_id FROM item INNER JOIN category USING(category_id) WHERE category_large=%s AND category_middle=%s"""
            curs.execute(query, (category_large, category_middle))
            item_ids = curs.fetchall()
        connect.close()
        for i, item in enumerate(item_ids):
            item_idx.append(vec_item[item[0]])
            data_idx[str(i)] = item[0]
        data_np = vec_np[item_idx,:]
    neigh.fit(data_np)
    rec_items = []
    rec_correctRate = []
    result = neigh.kneighbors([input])
    for i, index in enumerate(result[1][0]):
        if data_idx[str(index)] not in rec_items:
            rec_items.append(data_idx[str(index)])
            correct_vec = data_np[index,:] * input
            rec_correctRate.append(calCorrectRate(correct_vec, helpful_cnt[0], caution_cnt[0]))
    return rec_items, rec_correctRate

# 일치율 계산
def calCorrectRate(vec, helpful_cnt, caution_cnt):
    # 벡터에서 아이템과 스킨타입 곱하기 -> 양수 (도움) 음수 (주의) 수식에 넣어서 계산
    help = 0
    caution = 0
    for i in range(vec.shape[0]-3):
        if vec[i] > 0:
            help += 1
        elif vec[i] < 0:
            caution += 1
    return (help/helpful_cnt)*(help-caution)/(help+caution)*100

def updateVector():
    makeSkinVector()
    makeitemVector()
    makeReviewVector()
    makeVector()

if __name__ == '__main__':
    print(knn({'skinType': 1, 'age': 25, 'gender': '여'}))