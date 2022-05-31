from pyexpat import model
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from flask import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status

from recordsApp.models import Records
from recordsApp.serializer import RecordsSerializer
# Create your views here.


@csrf_exempt
# @api_view(['GET', 'POST'])
def recordsApi(request, id=0):
    if request.method=='GET':
        records = Records.objects.all()
        records_serializer=RecordsSerializer(records, many=True)
        return JsonResponse(records_serializer.data, safe=False)

    if request.method=='POST':  
        records_data = JSONParser().parse(request)
        serializer = RecordsSerializer(data=records_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully!", safe=False)
        else:
            print("weve got an errrrr")
            return JsonResponse(serializer.errors, safe=False)
