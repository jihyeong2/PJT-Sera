from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import tqdm
from SeraRec.database import *
from SeraRec.knn import *
# Create your views here.

@api_view(['GET'])
def searchItems(request, user_id, keyword, category_large=None):
    result = {}
    connect, curs = connectMySQL()
    user = selectUser(user_id, connect,curs)
    result_item_name , result_item_element = search(user,keyword, category_large=category_large, connect=connect, curs=curs)
    connect.close()
    result['item_name_list'] = result_item_name
    result['item_element_list'] = result_item_element
    return JsonResponse({'item_list': result}, json_dumps_params={'ensure_ascii': False})