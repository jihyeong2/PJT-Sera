from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import tqdm
from SeraRec.database import *
from SeraRec.knn import *
# Create your views here.

@api_view(['GET'])
def searchItems(request, user_id, keyword):
    result = {}
    result_item_name = []
    result_item_element = []
    user = selectUser(user_id)
    connect, curs = connectMySQL()
    search_keyword = '%' + keyword + '%'
    query = """SELECT i.*, c.* FROM item i INNER JOIN category c USING(category_id)
                WHERE i.item_name like %s"""
    curs.execute(query, (search_keyword))
    items = curs.fetchall()
    if len(items) > 0 :
        result_item_element = normal(items, user)
    connect.close()

    result['item_name_list'] = result_item_name
    result['item_element_list'] = result_item_element

    return JsonResponse({'item_list': result}, json_dumps_params={'ensure_ascii': False})

