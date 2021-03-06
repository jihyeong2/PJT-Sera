from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cosmetics_API.models import Item
from SeraRec.database import *
from SeraRec.knn import *
import tqdm
from django.views.decorators.csrf import csrf_exempt
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
    connect.close()
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
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})
    
# 전체 화장품 추천 리스트
@api_view(['GET'])
def itemListRecom(request, user_id, category_large=None, category_middle=None):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    user_info = {'age' : user['user_age'], 'gender' : user['user_gender'], 'skinType' : user['skin_id']}
    items = []
    rates = []
    if category_large != None and category_middle == None:
        items, rates = knn(knn_neighbor_cnt,user_info,category_large=category_large, connect=connect, curs=curs)
    elif category_large != None and category_middle != None:
        items, rates = knn(knn_neighbor_cnt,user_info,category_large=category_large, category_middle=category_middle, connect=connect, curs=curs)
    else:
        items, rates = knn(knn_neighbor_cnt,user_info,connect = connect, curs=curs)
    data = makeRecomItemList(recom_item_cnt, items, rates, user, connect, curs)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 화장품 디테일
@api_view(['GET'])
def item_one(request, user_id, item_id):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    query = """SELECT i.*, c.*,si.helpful_cnt, si.caution_cnt FROM item i INNER JOIN category c USING(category_id) INNER JOIN item_skin si USING(item_id)
                WHERE si.skin_id = %s AND item_id = %s"""
    curs.execute(query,(user['skin_id'],item_id))
    item = curs.fetchone()
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    etc = ['helpful_cnt', 'caution_cnt']
    item_json = {}
    for (d, f) in zip(item[:10], fields):
        item_json[f] = d
    for (d, f) in zip(item[10:14], category_fields):
        item_json[f] = d
    for (d, f) in zip(item[14:], etc):
        item_json[f] = d
    item_json['tags'] = selectItemTag(item[0], connect, curs)
    item_json['dibs'] = selectDibs(user['user_id'], item[0], connect, curs)
    item_json['rating'] = item_json['helpful_cnt']-item_json['caution_cnt']
    elements = selectElementForDetail(item[0], user['skin_id'], connect, curs)
    item_json['ingredient_elements'] = elements
    connect.close()
    return JsonResponse(item_json, json_dumps_params={'ensure_ascii': False})
    
# 가격 순 정렬
@api_view(['GET'])
def itemSortPrice(request, user_id, category_large=None, category_middle=None, sort_type=None):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    if sort_type == 0:
        data = sort(user, type='price', subType='low', category_large=category_large, category_middle=category_middle, connect = connect, curs=curs)
    else:
        data = sort(user, type='price', subType='high', category_large=category_large, category_middle=category_middle, connect = connect, curs=curs)
    connect.close()
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 별점 순
@api_view(['GET'])
def itemSortScore(request, user_id, category_large=None, category_middle=None):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    data = sort(user, type='score', category_large=category_large, category_middle=category_middle, connect=connect, curs=curs)
    connect.close()
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 리뷰 개수 순
@api_view(['GET'])
def itemSortReviewCnt(request, user_id, category_large=None, category_middle = None):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    data = sort(user, type='reviewCnt', category_large=category_large, category_middle=category_middle, connect=connect, curs=curs)
    connect.close()
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 맞춤 화장품 리스트( 도움 성분 개수 순 )
@api_view(['GET'])
def itemListCorrect(request, user_id, type, category_large=None):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    data = correct(user, category_large = category_large, type=type, connect=connect, curs=curs)
    connect.close()
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

@csrf_exempt
def DibsItem(request, user_id, item_id):
    result = False
    connect, curs = connectMySQL()
    if request.method == 'PUT':
        query = """SELECT * FROM dibs WHERE user_id = %s AND item_id=%s"""
        curs.execute(query, (user_id, item_id))
        check = curs.fetchone()
        result = False
        if check == None:
            result = True
            query = """INSERT INTO dibs (user_id, item_id)
                    VALUES(%s, %s) """
            curs.execute(query, (user_id, item_id))
            connect.commit()
            query = """SELECT count(*) FROM dibs WHERE item_id=%s"""
            curs.execute(query, (item_id))
            cnt = int(curs.fetchone()[0])
            query = """UPDATE item SET dibs_cnt=%s
                    WHERE item_id = %s """
            curs.execute(query, (cnt, item_id))
            connect.commit()
    elif request.method == 'DELETE':
        query = """SELECT * FROM dibs WHERE user_id = %s AND item_id=%s"""
        curs.execute(query, (user_id, item_id))
        check = curs.fetchone()
        result = False
        if check != None:
            result = True
            query = """DELETE FROM dibs
                    WHERE user_id=%s AND item_id=%s"""
            curs.execute(query, (user_id, item_id))
            connect.commit()
            query = """SELECT count(*) FROM dibs WHERE item_id=%s"""
            curs.execute(query, (item_id))
            cnt = int(curs.fetchone()[0])
            query = """UPDATE item SET dibs_cnt=%s
                    WHERE item_id = %s """
            curs.execute(query, (cnt, item_id))
            connect.commit()
    connect.close()
    return JsonResponse({'success': result}, json_dumps_params={'ensure_ascii': False})

@api_view(['GET'])
def DibsItemList(request, user_id):
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect, curs)
    data = dibsItemList(user, connect, curs)
    connect.close()
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})

# 리스트 만들기
def makeRecomItemList(item_cnt, items, rates, user, connect, curs):
    data = []
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
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
        item_json['dibs'] = selectDibs(user['user_id'], item[0], connect, curs)
        data.append(item_json)
    return data