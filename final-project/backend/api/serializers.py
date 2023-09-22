from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["id", "amount", "description", "date", "account"]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ["id", "user", "accounts", "debt_records"]


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "balance", "transactions", "user"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "date_joined"]


class DebtRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebtRecord
        fields = ["id", "name", "transactions", "user"]
