from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cosmetics_API.models import Item
from SeraRec.database import *
from SeraRec.knn import *
import tqdm
# Create your views here.
@api_view(['GET'])
def item_list(request):
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
    return JsonResponse({'item_list':data}, json_dumps_params={'ensure_ascii': False})

@api_view(['GET'])
def item_recom(request, user_id):
    connect, curs = connectMySQL()
    query = """SELECT * FROM user WHERE user_id=%s"""
    curs.execute(query, (user_id))
    user = curs.fetchone()
    user = {'age' : user[4], 'gender' : user[6], 'skinType':user[7]}
    item_list = knn(user)
    data = []
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    for item_id in tqdm.tqdm(item_list[:50]):
        query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id) WHERE item_id=%s"""
        curs.execute(query, (item_id))
        item = curs.fetchone()
        item_json = {}
        for (d, f) in zip(item[:10], fields):
            item_json[f] = d
        for (d, f) in zip(item[10:], category_fields):
            item_json[f] = d
        data.append(item_json)
    connect.close()
    return JsonResponse({'item_list':data}, json_dumps_params={'ensure_ascii': False})

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

@api_view(['GET'])
def item_list_category_mid(request, category_large, category_middle):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
            WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s and category_middle=%s)"""
    curs.execute(query,(category_large, category_middle))
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
    return JsonResponse({'item_list':data}, json_dumps_params={'ensure_ascii': False})
    
@api_view(['GET'])
def item_list_category_large(request, category_large):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
            WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s)"""
    curs.execute(query,(category_large))
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
    
# 가격 순 정렬
@api_view(['GET'])
def itemSortPriceCategoryLarge(request, category_large, sort_type):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
            WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s) AND i.item_price != '가격미정'"""
    curs.execute(query,(category_large))
    items = curs.fetchall()
    connect.close()
    if sort_type == 0:
        items = sorted(items, key=lambda x: int(x[7][:-1].replace(',', '').strip()))
    else:
        items = sorted(items, key=lambda x: int(x[7][:-1].replace(',', '').strip()), reverse=True)
    data = makeItemList(items)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})
@api_view(['GET'])
def itemSortPriceCategoryMiddle(request, category_large, category_middle, sort_type):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
            WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s and category_middle=%s) AND i.item_price != '가격미정'"""
    curs.execute(query,(category_large, category_middle))
    items = curs.fetchall()
    connect.close()
    if sort_type == 0:
        items = sorted(items, key=lambda x: int(x[7][:-1].replace(',', '').strip()))
    else:
        items = sorted(items, key=lambda x: int(x[7][:-1].replace(',', '').strip()), reverse=True)
    data = makeItemList(items)
    return JsonResponse({'item_list':data}, json_dumps_params={'ensure_ascii': False})

# 별점 순
@api_view(['GET'])
def itemSortScoreCategoryLarge(request, category_large):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.*, IFNULL((SELECT avg(review_score) FROM review r WHERE i.item_id = r.item_id),0) as score FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s)
                ORDER BY score desc"""
    curs.execute(query,(category_large))
    items = curs.fetchall()
    connect.close()
    data = makeItemList(items)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})
@api_view(['GET'])
def itemSortScoreCategoryMiddle(request, category_large, category_middle):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.*, IFNULL((SELECT avg(review_score) FROM review r WHERE i.item_id = r.item_id),0) as score FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s AND category_middle=%s)
                ORDER BY score desc"""
    curs.execute(query,(category_large, category_middle))
    items = curs.fetchall()
    connect.close()
    data = makeItemList(items)
    return JsonResponse({'item_list':data}, json_dumps_params={'ensure_ascii': False})
# 리뷰 개수 순
@api_view(['GET'])
def itemSortReviewCntCategoryLarge(request, category_large):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.*, (SELECT count(*) FROM review r WHERE i.item_id = r.item_id) as count FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s)
                ORDER BY count desc"""
    curs.execute(query,(category_large))
    items = curs.fetchall()
    connect.close()
    data = makeItemList(items)
    return JsonResponse({'item_list': data}, json_dumps_params={'ensure_ascii': False})
@api_view(['GET'])
def itemSortReviewCntCategoryMiddle(request, category_large, category_middle):
    connect, curs = connectMySQL()
    query = """SELECT i.*, c.*, (SELECT count(*) FROM review r WHERE i.item_id = r.item_id) as count FROM item i INNER JOIN category c USING(category_id)
                WHERE category_id IN (SELECT category_id FROM category WHERE category_large=%s AND category_middle=%s)
                ORDER BY count desc"""
    curs.execute(query,(category_large, category_middle))
    items = curs.fetchall()
    connect.close()
    data = makeItemList(items)
    return JsonResponse({'item_list':data}, json_dumps_params={'ensure_ascii': False})

def makeItemList(items):
    data = []
    fields = ['item_id', 'item_name', 'item_img', 'item_brand','category_id','item_colors','item_volume','item_price','item_description','dibs_cnt',]
    category_fields = ['category_id', 'category_large', 'category_middle', 'category_small']
    for item in tqdm.tqdm(items[:100]):
        item_json = {}
        for (d, f) in zip(item[:10], fields):
            item_json[f] = d
        for (d, f) in zip(item[10:], category_fields):
            item_json[f] = d
        data.append(item_json)
    return data

