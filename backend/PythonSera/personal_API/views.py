from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cosmetics_API.models import Item
from personalColor.src.main import *
import tqdm
# Create your views here.
# 퍼스널 컬러 진단
@api_view(['POST'])
def personalColorTest(request, user_id, image):
    main(image)
    return JsonResponse({'personal_color': '봄웜'}, json_dumps_params={'ensure_ascii': False})

