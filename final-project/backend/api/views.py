from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from rest_framework.reverse import reverse
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.decorators import permission_classes
from rest_framework import permissions


# Create your views here.
@api_view(["GET"])
def api_root(request):
    return Response(
        {
            "login": reverse("login", request=request),
            "logout": reverse("logout", request=request),
            "register": reverse("register", request=request),
            "users": reverse("users", request=request),
            "user_details": reverse("user_details", request=request),
            "change_username": reverse("change_username", request=request),
            "current_user": reverse("current_user", request=request),
            "transactions": reverse("transactions", request=request),
            "accounts": reverse("accounts", request=request),
            "debt_records": reverse("debt_records", request=request),
            "auth_token": reverse("api_token_auth", request=request),
        }
    )


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def get_transactions(request):
    if request.method == "GET":
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    else:
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            account = Account.objects.get(pk=serializer.data["account"][0])
            account.balance += serializer.data["amount"]
            account.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
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
        account = Account.objects.get(pk=serializer.data["account"][0])
        account.balance -= serializer.data["amount"]
        account.save()
        transaction.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_user_transactions(request, id):
    try:
        account = Account.objects.get(id=id)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serialized_transactions = [
        TransactionSerializer(i).data for i in account.transactions.all()
    ]
    return Response(serialized_transactions)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_debt_transactions(request, id):
    try:
        debt_record = DebtRecord.objects.get(id=id)
    except DebtRecord.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serialized_debt_record = [
        TransactionSerializer(i).data for i in debt_record.transactions.all()
    ]
    return Response(serialized_debt_record)


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailList(ListCreateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer


class AccountList(ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetail(RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class DebtRecordList(ListCreateAPIView):
    queryset = DebtRecord.objects.all()
    serializer_class = DebtRecordSerializer


class DebtRecordDetail(RetrieveUpdateDestroyAPIView):
    queryset = DebtRecord.objects.all()
    serializer_class = DebtRecordSerializer


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    user_serializer = UserSerializer(request.user)
    details_serializer = UserDetailSerializer(request.user.details)
    current_user = {**details_serializer.data, **user_serializer.data}
    current_user.pop("user")
    return Response(current_user)


@api_view(["POST"])
def login_view(request):
    # Attempt to sign user in
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(request, username=username, password=password)

    # Check if authentication successful
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["DELETE"])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def register(request):
    username = request.data["username"]
    email = request.data["email"]

    # Ensure password matches confirmation
    password = request.data["password"]
    confirmation = request.data["confirmation"]
    if password != confirmation:
        return Response(
            {"message": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response(
            {"message": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST
        )
    login(request, user)
    details_serializer = UserDetailSerializer(data={"user": user.id, "accounts": []})
    if details_serializer.is_valid():
        details_serializer.save()

    user_serializer = UserSerializer(user)
    current_user = {**details_serializer.data, **user_serializer.data}
    current_user.pop("user")
    return Response(current_user)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def change_username(request):
    new_username = request.data["username"]

    try:
        request.user.username = new_username
        request.user.save()
    except IntegrityError:
        return Response(
            {"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST
        )
    return Response(status=status.HTTP_200_OK)
