from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from rest_framework.reverse import reverse
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)


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
            "current_user": reverse("current_user", request=request),
            "transactions": reverse("transactions", request=request),
            "accounts": reverse("accounts", request=request),
        }
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


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailList(ListCreateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer


class UserDetailDetail(RetrieveUpdateDestroyAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer


class AccountList(ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = Account.objects.all()


class AccountDetail(RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = Account.objects.all()


@api_view(["GET"])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


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
        return Response({"message": "Passwords must match."})

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response({"message": "Username already taken."})
    login(request, user)

    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
