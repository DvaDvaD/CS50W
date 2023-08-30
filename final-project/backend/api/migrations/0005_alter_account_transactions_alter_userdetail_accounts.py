# Generated by Django 4.2.3 on 2023-08-28 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_account_transactions_alter_userdetail_accounts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='transactions',
            field=models.ManyToManyField(blank=True, related_name='account', to='api.transaction'),
        ),
        migrations.AlterField(
            model_name='userdetail',
            name='accounts',
            field=models.ManyToManyField(blank=True, related_name='user', to='api.account'),
        ),
    ]