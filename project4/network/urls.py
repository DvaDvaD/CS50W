from django.contrib.auth import views as auth_views
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile/<int:user_id>", views.profile, name="profile"),
    path("following", views.following, name="following"),
    
    # API Routes
    path("new_post", views.new_post, name="new_post"),
    path("posts", views.posts, name="posts"),
    path("users/<int:user_id>", views.user, name="user"),
    path("posts/<int:post_id>", views.post, name="post")
]
