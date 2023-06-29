from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Transaction(models.Model):
    amount = models.IntegerField()
    description = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
