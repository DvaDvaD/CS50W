# Generated by Django 4.1.7 on 2023-04-16 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0016_alter_auctionlisting_watchlisted_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='auctionlisting',
            name='closed',
            field=models.BooleanField(default=False),
        ),
    ]
