# Generated by Django 4.1.7 on 2023-04-16 08:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0014_alter_auctionlisting_time_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='auctionlisting',
            name='watchlisted_by',
            field=models.ManyToManyField(related_name='watchlist', to=settings.AUTH_USER_MODEL),
        ),
    ]
