# Generated by Django 4.1.7 on 2023-04-16 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0013_comment_listing'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auctionlisting',
            name='time_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
