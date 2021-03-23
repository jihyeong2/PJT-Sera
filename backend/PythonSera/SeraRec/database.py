import os, json, pymysql, re
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
        helpful = []
        caution = []
        lines = []
        content = ''

        with open(skin_path + filename, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace('\n\n','\n')
        content = re.split('도움성분|주의성분',content)
        skinType = content[0].strip()
        lines = content[1].strip().split('\n')

        for line in lines:
            if ',' not in line: continue
            sp = line.split(',')
            element = {'level': sp[0].strip(), 'korean': sp[1].strip()}
            if element not in helpful:
                helpful.append(element)
        
        lines = content[2].strip().split('\n')
        
        for line in lines:
            if ',' not in line: continue
            sp = line.split(',')
            element = {'level': sp[0].strip(), 'korean': sp[1].strip()}
            if element not in caution:
                caution.append(element)

        skin_elements.append({'skinType' : skinType, 'helpful' : helpful, 'caution' : caution})
    
    return skin_elements

def loadElement():
    items = loadJsonItem()
    elements = {}
    element = set()

    for jdic in items:
        for i in jdic["elements"]:
            if '[중복]' in i['korean'] or len(i['korean']) < 1 : continue
            
            if i['korean'] not in elements.keys():
                elements[i['korean']] = {'level': i['level'], 'english': i['english'], 'purpose': i['purpose']}
            else:
                if elements[i['korean']]['level'] == '-' and i['level'] != '-':
                    elements[i['korean']]['level'] = i['level']
                if len(elements[i['korean']]['english']) < len(i['english']):
                    elements[i['korean']]['english'] = i['english']
                if len(elements[i['korean']]['purpose']) < len(i['purpose']):
                    elements[i['korean']]['purpose'] = i['purpose']

            # element.add((i['level'], i['korean'], i['english'], i['purpose']))
    # return sorted(list(element), key=lambda x:x[1])
    return sorted(elements.items())

def loadCategory():
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

def connectMySQL():
    connect = pymysql.connect(host='seradb.c8joeykpqvdy.ap-northeast-2.rds.amazonaws.com', user='admin', password='ssafyB202SERA', db='seraDB', charset='utf8mb4')
    curs = connect.cursor()

    return connect, curs

def insertItems():
    items = loadJsonItem()
    connect, curs = connectMySQL()
    
    query = """DELETE FROM item"""
    curs.execute(query)
    connect.commit()

    for i, item in enumerate(items):
        query = """SELECT item_id FROM item WHERE item_name = %s and item_img = %s"""
        curs.execute(query, (item['name'], item['image']))
        item_id = curs.fetchone()
        if item_id is not None : continue

        query = """SELECT category_id FROM category WHERE category_large = %s and category_small = %s"""
        curs.execute(query, (item['category'][0], item['category'][-1]))
        category_id = curs.fetchone()
        
        query = """INSERT INTO item (item_id, item_name, item_img, item_brand, category_id, item_colors, item_volume, item_price, item_description, dibs_cnt)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        curs.execute(query, (item['id'], item['name'], item['image'], item['brand'], category_id[0], item['colors'], item['volume'], item['price'], item['discription'], 0))
        print(str(i+1)+'/'+str(len(items)))
        
    connect.commit()
    connect.close()

def insertCategories():
    category_dic = loadCategory()
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
        curs.execute(query, (skin['skinType']))

    connect.commit()
    connect.close()

def insertElement():
    elements = loadElement()
    connect, curs = connectMySQL()

    query = """DELETE FROM element"""
    curs.execute(query)
    connect.commit()

    for i, e in enumerate(elements):
        query = """INSERT INTO element (element_korean_name, element_english_name, element_purpose, element_level)
                VALUES(%s, %s, %s, %s) """
        curs.execute(query, (e[0], e[1]['english'], e[1]['purpose'], e[1]['level']))
        print(str(i+1)+'/'+str(len(elements)))

    connect.commit()
    connect.close()

def insertItemByElement():
    items = loadJsonItem()
    connect, curs = connectMySQL()

    # query = """DELETE FROM item_element"""
    # curs.execute(query)
    # connect.commit()
    
    for i, item in enumerate(items[36316:]):
        query = """SELECT item_id FROM item WHERE item_id = %s"""
        curs.execute(query, (item['id']))
        item_id = curs.fetchone()
        if item_id is None: continue
        
        for e in item['elements']:
            if '[중복]' in e['korean']:
                e['korean'] = e['korean'][4:].strip()
            elif len(e['korean']) < 1: continue
            
            if e['korean'] == '3-0-에틸아스코빅애씨드':
                e['korean'] = '3-O-에틸아스코빅애씨드'
            elif e['korean'] == '크리산텔룸인디쿰추출물':
                e['korean'] = '크리산텔룸 인디쿰추출물;감국추출물'
            elif e['korean'] == '감자펄프' or e['korean'] == '검정콩가루':
                continue

            query = """SELECT element_id FROM element WHERE element_korean_name = %s"""
            curs.execute(query, (e['korean']))
            element_id = curs.fetchone()

            if element_id is None:
                query = """SELECT element_id FROM element WHERE element_korean_name like %s OR element_korean_name like %s 
                        OR element_korean_name like %s"""
                curs.execute(query, (e['korean']+';%','%;'+e['korean'],'%;'+e['korean']+';%'))
                element_id = curs.fetchall()
                if len(element_id) > 1:
                    print('갯수 1개 이상 : ', element_id, e)
                    return
                elif len(element_id) < 1:
                    if ';' in e['korean']:
                        element_names = e['korean'].split(';')
                        for name in element_names:
                            name = name.strip()
                            query = """SELECT element_id FROM element WHERE element_korean_name = %s"""
                            curs.execute(query, (name))
                            element_id = curs.fetchone()
                            if element_id is not None:
                                break
                        if element_id is None:
                            for name in element_names:
                                name = name.strip()
                                query = """SELECT element_id FROM element WHERE element_korean_name like %s OR element_korean_name like %s 
                                        OR element_korean_name like %s"""
                                curs.execute(query, (name+';%','%;'+name,'%;'+name+';%'))
                                element_id = curs.fetchall()
                                if len(element_id) == 1:
                                    element_id = element_id[0]
                                    break
                                elif len(element_id) > 1:
                                    print('갯수 1개 이상 : ', element_id, e)
                                    return
                            if element_id is None:
                                print('갯수 0개  : ', element_id, e)
                                return
                    else:
                        print('갯수 0개  : ', element_id, e)
                        return
                else:    
                    element_id = element_id[0]

            if element_id is not None:
                try : 
                    query = """INSERT INTO item_element (item_id, element_id)
                            VALUES(%s, %s) """
                    curs.execute(query, (item_id[0], element_id[0]))
                except pymysql.err.IntegrityError as e:
                    print(e)
                    continue
            else:
                print('성분을 찾을 수 없음 ' + str(item_id[0]) + ' ' + e['korean'])
                return
        print(str(i+1)+'/'+str(len(items))+' '+str(item_id[0]))
        connect.commit()
    connect.close()

def insertHelpful():
    skins = loadSkinType()
    connect, curs = connectMySQL()

    for skin in skins:
        query = """SELECT skin_id FROM skin WHERE skin_type = %s"""
        curs.execute(query, (skin['skinType']))
        skin_id = curs.fetchone()
        for e in skin['helpful']:
            
            if e['korean'] == '제니스테인':
                e['korean'] = '제니스테인메틸에테르'
            
            query = """SELECT element_id FROM element WHERE element_korean_name = %s"""
            curs.execute(query, (e['korean']))
            element_id = curs.fetchone()
            if element_id is None:
                query = """SELECT element_id FROM element WHERE element_korean_name like %s OR element_korean_name like %s 
                        OR element_korean_name like %s"""
                curs.execute(query, (e['korean']+';%','%;'+e['korean'],'%;'+e['korean']+';%'))
                element_id = curs.fetchall()

                if len(element_id) > 1:
                    print(skin_id[0], element_id, e)

                    return
                elif len(element_id) < 1:
                    if '추출물' not in e['korean'] :
                        e['korean'] = e['korean']+'추출물'
                    
                    query = """SELECT element_id FROM element WHERE element_korean_name = %s"""
                    curs.execute(query, (e['korean']))
                    element_id = curs.fetchone()

                    if element_id is None:
                        query = """SELECT element_id FROM element WHERE element_korean_name like %s OR element_korean_name like %s 
                            OR element_korean_name like %s"""
                        curs.execute(query, (e['korean']+';%','%;'+e['korean'],'%;'+e['korean']+';%'))
                        element_id = curs.fetchall()
                        if len(element_id) >= 1 : element_id = element_id[0]
                        else : 
                            print('?',skin_id[0], element_id, e)
                            continue
                else :
                    element_id = element_id[0]
            if element_id is None:
                continue
            else :
                try :
                    query = """INSERT INTO helpful (skin_id, element_id)
                            VALUES(%s, %s) """
                    curs.execute(query, (skin_id[0], element_id[0]))
                except pymysql.err.IntegrityError as e:
                    print(e)
                    continue
        connect.commit()
    connect.close()

def insertCaution():
    skins = loadSkinType()
    connect, curs = connectMySQL()

    for skin in skins:
        query = """SELECT skin_id FROM skin WHERE skin_type = %s"""
        curs.execute(query, (skin['skinType']))
        skin_id = curs.fetchone()
        for e in skin['caution']:
            
            if e['korean'] == '제니스테인':
                e['korean'] = '제니스테인메틸에테르'
            
            query = """SELECT element_id FROM element WHERE element_korean_name = %s"""
            curs.execute(query, (e['korean']))
            element_id = curs.fetchone()
            if element_id is None:
                query = """SELECT element_id FROM element WHERE element_korean_name like %s OR element_korean_name like %s 
                        OR element_korean_name like %s"""
                curs.execute(query, (e['korean']+';%','%;'+e['korean'],'%;'+e['korean']+';%'))
                element_id = curs.fetchall()

                if len(element_id) > 1:
                    print(skin_id[0], element_id, e)

                    return
                elif len(element_id) < 1:
                    if '추출물' not in e['korean'] :
                        e['korean'] = e['korean']+'추출물'
                    
                    query = """SELECT element_id FROM element WHERE element_korean_name = %s"""
                    curs.execute(query, (e['korean']))
                    element_id = curs.fetchone()

                    if element_id is None:
                        query = """SELECT element_id FROM element WHERE element_korean_name like %s OR element_korean_name like %s 
                            OR element_korean_name like %s"""
                        curs.execute(query, (e['korean']+';%','%;'+e['korean'],'%;'+e['korean']+';%'))
                        element_id = curs.fetchall()
                        if len(element_id) >= 1 : element_id = element_id[0]
                        else : 
                            print('?',skin_id[0], element_id, e)
                            continue
                else :
                    element_id = element_id[0]
            if element_id is None:
                continue
            else :
                try :
                    query = """INSERT INTO caution (skin_id, element_id)
                            VALUES(%s, %s) """
                    curs.execute(query, (skin_id[0], element_id[0]))
                except pymysql.err.IntegrityError as e:
                    print(e)
                    continue
        connect.commit()
    connect.close()

def insertTag():
    items = loadJsonItem()
    connect, curs = connectMySQL()
    tags = set()
    for item in items:
        [tags.add(t) for t in item['tags']]
    tags = sorted(tags)
    query = """INSERT INTO tag (tag_name)
                VALUES (%s)"""
    for t in tags:
        curs.execute(query,(t))
    connect.commit()
    connect.close()

def insertItemTag():
    items = loadJsonItem()
    connect, curs = connectMySQL()
    query = """INSERT INTO item_tag (item_id, tag_id)
            VALUES (%s,%s)"""
    for i, item in enumerate(items[28022:]):
        q = """SELECT item_id FROM item WHERE item_id = %s"""
        curs.execute(q, (item['id']))
        item_id = curs.fetchone()
        if item_id is None : continue
        for t in item['tags']:
            q = """SELECT tag_id FROM tag WHERE tag_name = %s"""
            curs.execute(q, t)
            tag_id = curs.fetchone()
            curs.execute(query, (item_id[0], tag_id[0]))
        connect.commit()
        print(str(i+1)+'/'+str(len(items))+' '+str(item['id']))
    connect.close()

if __name__ == '__main__':
    # insertCategories()
    # insertItems()
    # insertSkinType()
    # insertElement()
    # insertItemByElement()
    # insertHelpful()
    # insertCaution()
    # insertTag()
    insertItemTag()
