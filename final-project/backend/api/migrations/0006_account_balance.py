# Generated by Django 4.2.3 on 2023-09-02 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_account_transactions_alter_userdetail_accounts'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='balance',
            field=models.IntegerField(default=0),
        ),
    ]