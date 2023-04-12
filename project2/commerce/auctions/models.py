from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        else:
            return self.username


class AuctionListing(models.Model):
    CATEGORY_CHOICES = [
        ('NONE', ''),
        ('FSHN', 'Fashion'),
        ('TOYS', 'Toys'),
        ('ELEC', 'Electronics'),
        ('HOME', 'Home'),
        ('MISC', 'Miscellaneous')
    ]
    
    title = models.CharField(max_length=128)
    description = models.TextField()
    starting_bid = models.FloatField()
    current_bid = models.FloatField(blank=True, null=True)
    image_URL = models.TextField(blank=True, null=True)
    lister = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings', blank=True, null=True)
    category = models.CharField(max_length=64, choices=CATEGORY_CHOICES, default='NONE')
    time_created = models.TimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} ({self.category}) - {self.starting_bid}"


class Bid(models.Model):
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    listing = models.ForeignKey(AuctionListing, on_delete=models.CASCADE, related_name="bids")
    bid = models.FloatField()
    
    def __str__(self):
        return f"{self.bidder} bidded ${self.bid} on {self.listing}"
    

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    time_commented = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
    
    def __str__(self):
        return f"{self.commenter} commented \"{self.comment}\" on {self.time_commented.strftime('%b. %d, %Y %I:%M %p')}"
