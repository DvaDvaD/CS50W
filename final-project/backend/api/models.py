from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Transaction(models.Model):
    amount = models.IntegerField(default="")
    description = models.CharField(max_length=200, default="")
    date = models.DateTimeField(auto_now_add=True)


class Account(models.Model):
    transactions = models.ManyToManyField(
        Transaction, related_name="account", blank=True
    )


class UserDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    accounts = models.ManyToManyField(Account, related_name="user", blank=True)
