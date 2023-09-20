from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


# Create your models here.
class Transaction(models.Model):
    amount = models.IntegerField(default="")
    description = models.CharField(max_length=200, default="")
    date = models.DateTimeField()

    def __str__(self):
        return f"Transaction #{self.id}: {self.amount} - {self.description}"


class Account(models.Model):
    balance = models.IntegerField(default=0)
    transactions = models.ManyToManyField(
        Transaction, related_name="account", blank=True
    )

    def __str__(self):
        return f"Account #{self.id} with {self.transactions.count()} transactions"


class UserDetail(models.Model):
    user = models.OneToOneField(
        "auth.User", related_name="details", on_delete=models.CASCADE, null=True
    )
    accounts = models.ManyToManyField(Account, related_name="user", blank=True)

    def __str__(self):
        return f"UserDetail #{self.id} with {self.accounts.count()} accounts"


# Signal handler to update Account balance when a Transaction is saved
@receiver(post_save, sender=Transaction)
def update_account_balance_on_transaction_save(sender, instance, **kwargs):
    if instance.account.exists():
        account = instance.account.first()
        account.balance += instance.amount
        account.save()


# Signal handler to update Account balance when a Transaction is deleted
@receiver(post_delete, sender=Transaction)
def update_account_balance_on_transaction_delete(sender, instance, **kwargs):
    if instance.account.exists():
        account = instance.account.first()
        account.balance -= instance.amount
        account.save()
