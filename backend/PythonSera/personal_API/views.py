from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from PythonSera.settings import *
from personalColor.src.main import *
import tqdm
import boto3
from SeraRec.database import *
# Create your views here.
# 퍼스널 컬러 진단
@api_view(['POST'])
def personalColorTest(request):
    file = request.data.get('file')
    user_id = request.data.get('user_id')
    user_id = int(user_id)

    entries = s3_client.list_objects_v2(Bucket=AWS_STORAGE_BUCKET_NAME, Prefix='userImg/')
    for entry in entries['Contents']:
        key = entry['Key']
        filename = key.split("/")[1]
        if filename.split("_")[0] == str(user_id):
            s3_client.delete_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=key)
            break
    key = "userImg/"+str(user_id)+"_"+file.name
    s3_client.put_object(
        Body = file.read(), Bucket=AWS_STORAGE_BUCKET_NAME, Key=key, Metadata={ "ContentType": file.content_type}
    )
    uri = 'https://%s.s3.%s.amazonaws.com/%s' % (AWS_STORAGE_BUCKET_NAME, AWS_REGION, key)
    result_url = ''
    # uri = ''
    try:
        result = main(uri)
        result = result.split('톤')[0]
        query = """UPDATE user SET personal_color=%s, user_img=%s WHERE user_id=%s"""
        curs.execute(query, (result, uri, user_id))
        connect.commit()
        result_url = uri
    except:
        result = False
    return JsonResponse({'personal_color': result , 'user_img' : result_url}, json_dumps_params={'ensure_ascii': False})

