from database import *
from cbf import *
import tqdm
import pandas as pd
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

def makeitemDataframe():
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
    column = [i for i in range(len(specialElement))]
    item_df = pd.DataFrame(data, columns=column, index=item_idx)
    # print(item_df)
    return item_df

def makeReviewVector():
    item_df = makeitemDataframe()
    reviews = loadJsonReview()

    gender_dic = {"남":1, "여":-1}
    age_gender_score = {}

    for review in tqdm.tqdm(reviews):
        item = review["item"]
        age = review["age"]//10
        gender = review["gender"]
        score = review["score"]
        age_gender_score.setdefault(tuple([item, age, gender]), [])
        age_gender_score[tuple([item, age, gender])].append(score)

    items = []
    review_vec = np.empty((0, item_df.shape[1]+3), dtype=float)
    for (item, age, sex), scores in tqdm.tqdm(age_gender_score.items()):
        vector = item_df.loc[[item],:].values[0]
        vector = np.append(vector, np.array([age, gender_dic[sex], sum(scores)/len(scores)]))
        
        review_vec = np.append(review_vec, vector.reshape(1, -1), axis=0)
        items.append(item)
    np.savetxt('../crawling/data/GP/review_np.txt',review_vec)

def getExistItemReview():
    path = '../crawling/data/GP/exist_item_review.txt'
    item_ids = []
    with open(path, 'r', encoding='utf-8') as f:
        item_ids = f.read().split(', ')
    item_ids = set(item_ids)
    return item_ids

def getReviewDataFrame():
    path = '../crawling/data/GP/review_df.csv'
    review_df = pd.read_csv(path)
    return review_df

def getReviewNumPy():
    path = '../crawling/data/GP/review_np.txt'
    review_np = np.loadtxt(path)
    return review_np

if __name__ == '__main__':
    makeitemDataframe()
    # makeReviewVector()
    # test = getReviewNumPy()
    # print(test[0:])
    reviews = loadJsonReview()
    print(len(reviews))