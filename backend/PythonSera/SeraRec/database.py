import os, json, pymysql
path = '../crawling/data/GP/output/'

def loadJsonItem():
    file_list = os.listdir(path)
    items = []

    for file_name in file_list:
        if 'item' in file_name:
            with open(path + '/' + file_name, 'r', encoding='utf-8') as f:
                items += json.load(f)
    return items

def loadJsonReview():
    file_list = os.listdir(path)
    reviews = []

    for file_name in file_list:
        if 'review' in file_name:
            with open(path + '/' + file_name, 'r', encoding='utf-8') as f:
                reviews += json.load(f)
    return reviews

def loadSkinType():
    skin_path = '../crawling/data/피부타입/'
    file_list = os.listdir(skin_path)
    skin_elements = []

    for filename in file_list:
        skin_elements.append(filename[:-4])
    return sorted(skin_elements)

def loadElement():
    items = loadJsonItem()
    element = set()

    for jdic in items:
        for i in jdic["elements"]:
            element.add((i['level'], i['korean'], i['english'], i['purpose']))
    
    return sorted(list(element), key=lambda x:x[1])

def connectMySQL():
    connect = pymysql.connect(host='seradb.c8joeykpqvdy.ap-northeast-2.rds.amazonaws.com', user='admin', password='ssafyB202SERA', db='seraDB', charset='utf8mb4')
    curs = connect.cursor()

    return connect, curs

def insertItems():
    items = loadJsonItem()
    connect, curs = connectMySQL()

    for i, item in enumerate(items):
        query = """SELECT category_id FROM category WHERE category_large = %s and category_small = %s"""
        curs.execute(query, (item['category'][0], item['category'][-1]))
        category_id = curs.fetchone()
        
        query = """INSERT INTO item (item_name, item_img, item_brand, category_id, item_colors, item_volume, item_price, item_description, dibs_cnt)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        curs.execute(query, (item['name'], item['image'], item['brand'], category_id[0], item['colors'], item['volume'], item['price'], item['discription'], 0))
        print(str(i+1)+'/'+str(len(items)))
        
    connect.commit()
    connect.close()

def initCategories():
    items = loadJsonItem()
    large_category_dic = {}

    for item in items:
        category = item['category']
        large_category_dic.setdefault(category[0], set())
        large_category_dic[category[0]].add(category[-1])
    
    category_dic = []
    for large_cate, list_small_cate in sorted(large_category_dic.items(), key=lambda x:x[0]):
        for small_cate in sorted(list_small_cate):
            category_dic.append([large_cate, small_cate])
    return category_dic

def insertCategories():
    category_dic = initCategories()
    connect, curs = connectMySQL()
    for category in category_dic:
        query = """INSERT INTO category (category_large, category_small)
                VALUES(%s, %s) """
        curs.execute(query, (category[0], category[1]))        
    connect.commit()
    connect.close()

def insertSkinType():
    skinType = loadSkinType()
    connect, curs = connectMySQL()

    for skin in skinType:
        query = """INSERT INTO skin (skin_type)
                VALUES(%s) """
        curs.execute(query, (skin))

    connect.commit()
    connect.close()

def insertElement():
    elements = loadElement()
    connect, curs = connectMySQL()
    for i, e in enumerate(elements):
        query = """INSERT INTO element (element_korean_name, element_english_name, element_purpose, element_level)
                VALUES(%s, %s, %s, %s) """
        curs.execute(query, (e[1], e[2], e[3], e[0]))
        print(str(i+1)+'/'+str(len(elements)))

    connect.commit()
    connect.close()

def insertItemByElement():
    items = loadJsonItem()
    connect, curs = connectMySQL()
    for item in items:
        query = """SELECT item_id FROM item WHERE item_name = %s and item_img = %s"""
        curs.execute(query, (item['name'], item['image']))
        
        item_id = curs.fetchall()
        if len(item_id) >1 : print(item_id)
        # for e in item['element']:
        #     query = """INSERT INTO item_element (item_id, element_id)
        #             VALUES(%s, %s) """
            
        #     curs.execute(query,())
    
    connect.commit()
    connect.close()

if __name__ == '__main__':
    # insertCategories()
    # insertItems()
    # insertSkinType()
    # insertElement()
    insertItemByElement()