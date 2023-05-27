from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers")
    
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "followers": self.followers.count(),
            "following": self.following.count(),
            "posts_count": self.posts.count()
        }

class Post(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    
    def __str__(self):
        return f"{self.poster} posted \"{self.content}\" on {self.created.strftime('%b. %d, %Y %I:%M %p')} with {self.likes.count()}"
    
    def serialize(self):
        return {
            "id": self.id, 
            "poster": self.poster.serialize(),
            "content": self.content, 
            "created": self.created, 
            "likes": self.likes.count(), 
        }