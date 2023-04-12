# Generated by Django 4.1.7 on 2023-04-12 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0002_auctionlistings_comments_bids'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auctionlistings',
            name='category',
            field=models.CharField(choices=[('NONE', ''), ('FSHN', 'Fashion'), ('TOYS', 'Toys'), ('ELEC', 'Electronics'), ('HOME', 'Home'), ('MISC', 'Miscellaneous')], default='NONE', max_length=64),
        ),
        migrations.AlterField(
            model_name='auctionlistings',
            name='image_URL',
            field=models.TextField(blank=True),
        ),
    ]
