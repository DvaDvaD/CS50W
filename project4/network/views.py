import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

from .models import *


def index(request):
    if request.method == "GET":
        posts = Post.objects.order_by("-created")
        
        paginator = Paginator(posts, 10)     
        
        page_number = request.GET.get("page")
        page_obj = paginator.get_page(page_number)
        
        liked_posts_id = []
        if request.user.is_authenticated:
            liked_posts_id = [post.id for post in request.user.liked_posts.all()]
        
        return render(request, "network/index.html", {
            "posts": [post.serialize() for post in page_obj],
            "page_obj": page_obj,
            "liked_posts_id": liked_posts_id,
        })
    elif request.method == "POST":
        content = request.POST.get("content")
        
        if content is None:
            return HttpResponseRedirect(reverse("index"))
        
        new_post = Post(poster=request.user, content=content)
        new_post.save()
        return HttpResponseRedirect(reverse("index"))


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def profile(request, user_id):
    user = User.objects.get(id=user_id)

    try:
        followed = request.user.following.filter(id=user_id).exists()
    except AttributeError:
        followed = False
    
    posts = user.posts.order_by("-created")
    paginator = Paginator(posts, 10)
    
    page_number = request.GET.get("page") 
    page_obj = paginator.get_page(page_number)
    
    liked_posts_id = []
    if request.user.is_authenticated:
        liked_posts_id = [post.id for post in request.user.liked_posts.all()]
    
    return render(request, "network/profile.html", {
        "data": user.serialize(),
        "posts": [post.serialize() for post in page_obj],
        "page_obj": page_obj,
        "liked_posts_id": liked_posts_id,
        "followed": followed
    })
    

@login_required
def following(request):
    followed_post_ids = request.user.following.values_list("posts", flat=True)
    
    followed_posts = Post.objects.filter(id__in=followed_post_ids).order_by("-created")
    
    paginator = Paginator(followed_posts, 10)
    
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    
    liked_posts_id = [post.id for post in request.user.liked_posts.all()]    
        
    return render(request, "network/following.html", {
        "liked_posts_id": liked_posts_id,
        "posts": [post.serialize() for post in page_obj],
        "page_obj": page_obj,
    })


# API views
@login_required
def new_post(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)
    
    new_post = Post(poster=request.user, content=request.body.decode('utf-8'))
    new_post.save()
    
    return JsonResponse({"message": "Post created successfully", "post": new_post.serialize()}, status=201)

def posts(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required"}, status=400)

    posts = Post.objects.order_by("created").all()    
    return JsonResponse([post.serialize() for post in posts], safe=False)

def user(request, user_id):
    if request.method != "GET" and request.method != "PUT":
        return JsonResponse({"error": "GET request required"}, status=400)
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "The requested user does not exist"}, status=400)
    
    if request.method == "GET":
        return JsonResponse(user.serialize())
    else:
        data = json.loads(request.body)
        if data.get("follow") is not None:
            user.followers.add(request.user)
        elif data.get("unfollow") is not None:
            user.followers.remove(request.user)
        user.save()
        return JsonResponse({"message": "Follow status updated successfully", "followersCount": user.followers.count()}, status=200)
    

@login_required
def post(request, post_id):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required"}, status=400)
    
    data = json.loads(request.body)
    
    post = Post.objects.get(id=post_id)
    
    if data.get("liked") is not None:
        if data.get("liked"):
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        post.save()
        return HttpResponse(status=204)
    
    if request.user.id != post.poster.id or data.get("input") is None:
        return JsonResponse({"error": "Unauthorized request"}, status=403) 
    
    post.content = data.get("input")
    post.save()
    return HttpResponse(status=204)
    