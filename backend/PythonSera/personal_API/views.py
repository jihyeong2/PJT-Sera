from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cosmetics_API.models import Item
from personalColor.src.main import *
import tqdm
from boto.s3.connection import S3Connection
from boto.s3.key import Key
# Create your views here.
# 퍼스널 컬러 진단
@api_view(['POST'])
def personalColorTest(request):
    conn = S3Connection('AKIAXZ73MP3UNIXG5THG', '9aieuQXJZYaMvd/RC9uf3LcfjrouBDbOSCPYcNYj')
    bucket = conn.get_bucket('sera-s3')
    print("여기")
    print(bucket)
    file = request.file()
    url = uploadFile(bucket, 'test.jpg', file)
    print(url)
    result = main(file)
    return JsonResponse({'personal_color': result }, json_dumps_params={'ensure_ascii': False})

def uploadFile(bucket, filename, files):
    k = Key(bucket)
    k.key = filename
    k.set_contents_from_string(files.read())

    k.set_acl('public-read')

    return k.generate_url(3600*24*7)
