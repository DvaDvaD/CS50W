from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *


# Create your views here.
@api_view(["GET"])
def get_dummy_data(request):
    return Response(
        [
            {"id": 1, "amount": 10, "description": "dummy"},
            {"id": 2, "amount": 10, "description": "dummy"},
        ]
    )


@api_view(["GET", "POST"])
def get_transactions(request):
    if request.method == "GET":
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    else:
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def get_transaction(request, id):
    try:
        transaction = Transaction.objects.get(pk=id)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)
    elif request.method == "DELETE":
        serializer = TransactionSerializer(transaction)
        transaction.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
