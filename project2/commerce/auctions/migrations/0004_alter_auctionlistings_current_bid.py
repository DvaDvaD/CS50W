# Generated by Django 4.1.7 on 2023-04-12 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0003_alter_auctionlistings_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auctionlistings',
            name='current_bid',
            field=models.FloatField(blank=True),
        ),
    ]
