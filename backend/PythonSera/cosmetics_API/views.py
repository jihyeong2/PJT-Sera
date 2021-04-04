from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cosmetics_API.models import Item
from SeraRec.database import *
from SeraRec.knn import *
import tqdm
# Create your views here.

knn_neighbor_cnt = 100
recom_item_cnt = 50

# 전체 화장품 리스트
@api_view(['GET'])
def itemList(request):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)"""
    curs.execute(query)
    items = curs.fetchall()
    data = []
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    for item in tqdm.tqdm(items):
        item_json = {}
        for (d, f) in zip(item[:10], fields):
            item_json[f] = d
        for (d, f) in zip(item[10:], category_fields):
            item_json[f] = d
        data.append(item_json)
    connect.close()
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})
    
# 전체 화장품 추천 리스트
@api_view(['GET'])
def itemListRecom(request, user_id, category_large=None, category_middle=None):
    user = selectUser(user_id)
    user_info = {'age' : user['user_age'], 'gender' : user['user_gender'], 'skinType' : user['skin_id']}
    items = []
    rates = []
    if category_large != None and category_middle == None:
        items, rates = knn(knn_neighbor_cnt,user_info,category_large=category_large)
    elif category_large != None and category_middle != None:
        items, rates = knn(knn_neighbor_cnt,user_info,category_large=category_large, category_middle=category_middle)
    else:
        items, rates = knn(knn_neighbor_cnt,user_info)
    data = makeRecomItemList(recom_item_cnt, items, rates, user)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 화장품 디테일
@api_view(['GET'])
def item_one(request, item_id):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id) WHERE item_id=%s"""
    curs.execute(query,(item_id))
    item = curs.fetchone()
    connect.close()
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    item_json = {}
    for (d, f) in zip(item[:10], fields):
        item_json[f] = d
    for (d, f) in zip(item[10:], category_fields):
        item_json[f] = d
    return JsonResponse(item_json, json_dumps_params={'ensure_ascii': False})
    
# 가격 순 정렬
@api_view(['GET'])
def itemSortPrice(request, user_id, category_large=None, category_middle=None, sort_type=None):
    connect, curs = connectMySQL()
    if category_large != None and category_middle == None:
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN(SELECT category_id FROM category WHERE category_large = % s) AND i.item_price != '가격미정' """
        curs.execute(query,(category_large))
    elif category_large != None and category_middle != None:
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
                 WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s and category_middle=%s) AND i.item_price != '가격미정'"""
        curs.execute(query,(category_large, category_middle))
    else:
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
                 WHERE i.item_price != '가격미정'"""
        curs.execute(query)
    items = curs.fetchall()
    connect.close()
    user = selectUser(user_id)
    data = []
    if sort_type == 0:
        items = sorted(items, key=lambda x: int(x[7][:-1].replace(',', '').strip()))
        data = normal(items, user)
    else:
        items = sorted(items, key=lambda x: int(x[7][:-1].replace(',', '').strip()), reverse=True)
        data = normal(items, user)
    # data = makeSortItemList(items, user)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 별점 순
@api_view(['GET'])
def itemSortScore(request, user_id, category_large=None, category_middle=None):
    connect, curs = connectMySQL()
    if category_large != None and category_middle == None:
        query = """SELECT i.*, c.*, IFNULL((SELECT avg(review_score) FROM review r WHERE i.item_id = r.item_id),0) as score FROM item i INNER JOIN category c USING(category_id)
                    WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s)
                    ORDER BY score desc """
        curs.execute(query,(category_large))
    elif category_large != None and category_middle != None:
        query = """SELECT i.*, c.*, IFNULL((SELECT avg(review_score) FROM review r WHERE i.item_id = r.item_id),0) as score FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s AND category_middle=%s)
                ORDER BY score desc """
        curs.execute(query,(category_large, category_middle))
    else:
        query = """SELECT i.*, c.*, IFNULL((SELECT avg(review_score) FROM review r WHERE i.item_id = r.item_id),0) as score FROM item i INNER JOIN category c USING(category_id)
                ORDER BY score desc """
        curs.execute(query)
    items = curs.fetchall()
    connect.close()
    user = selectUser(user_id)
    data = normal(items, user)
    # data = makeSortItemList(items)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 리뷰 개수 순
@api_view(['GET'])
def itemSortReviewCnt(request, user_id, category_large=None, category_middle = None):
    connect, curs = connectMySQL()
    if category_large != None and category_middle == None:
        query = """SELECT i.*, c.*, (SELECT count(*) FROM review r WHERE i.item_id = r.item_id) as count FROM item i INNER JOIN category c USING(category_id)
                    WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s)
                    ORDER BY count desc """
        curs.execute(query,(category_large))
    elif category_large != None and category_middle != None:
        query = """SELECT i.*, c.*, (SELECT count(*) FROM review r WHERE i.item_id = r.item_id) as count FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s AND category_middle=%s)
                ORDER BY count desc """
        curs.execute(query,(category_large, category_middle))
    else:
        query = """SELECT i.*, c.*, (SELECT count(*) FROM review r WHERE i.item_id = r.item_id) as count FROM item i INNER JOIN category c USING(category_id)
                ORDER BY count desc """
        curs.execute(query)
    items = curs.fetchall()
    connect.close()
    user = selectUser(user_id)
    data = normal(items, user)
    # data = makeSortItemList(items)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 맞춤 화장품 리스트( 도움 성분 개수 순 )
@api_view(['GET'])
def itemListCorrect(request, user_id, category_large=None):
    connect, curs = connectMySQL()
    user = selectUser(user_id)
    if category_large != None:
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
                    WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s)
                """
        curs.execute(query,(category_large))
    else:
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)"""
        curs.execute(query)
    items = curs.fetchall()
    connect.close()
    data = correct(items, user)
    data = sorted(data, key=lambda x:x['rating'], reverse=True)
    return JsonResponse({'item_list': data[:100]}, json_dumps_params={'ensure_ascii': False})

# 리스트 만들기
def makeRecomItemList(item_cnt, items, rates, user):
    data = []
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    connect, curs = connectMySQL()
    for item_id, rate in tqdm.tqdm(zip(items[:item_cnt], rates[:item_cnt])):
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id) WHERE item_id=%s"""
        curs.execute(query, (item_id))
        item = curs.fetchone()
        item_json = {}
        for (d, f) in zip(item[:10], fields):
            item_json[f] = d
        for (d, f) in zip(item[10:], category_fields):
            item_json[f] = d
        item_json['help_cnt'] = rate[0]
        item_json['caution_cnt'] = rate[1]
        item_json['rating'] = rate[0] - rate[1]
        item_json['tags'] = selectItemTag(item[0])
        item_json['dibs'] = selectDibs(user['user_id'], item[0])
        data.append(item_json)
    connect.close()
    return data

# 사용자 정보 가져오기
def selectUser(user_id):
    connect, curs = connectMySQL()
    query = """SELECT * FROM user WHERE user_id = %s"""
    curs.execute(query, (user_id))
    user = curs.fetchone()
    connect.close()
    user_info = {}
    feilds = ['user_id', 'user_login_id', 'user_password', 'user_nickname', 'user_age', 'user_phone', 'user_gender', 'skin_id', 'personal_color', 'user_img']
    for (feild, info) in zip(feilds, user):
        user_info[feild] = info
    return user_info