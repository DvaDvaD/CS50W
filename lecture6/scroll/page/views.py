from django.shortcuts import render
from django.http import JsonResponse
import time

# Create your views here.
def index(request):
  return render(request, 'page/index.html')


def posts(request):
  start = int(request.GET.get('start'))
  end = int(request.GET.get('end'))
  
  posts = []
  
  for i in range(start, end + 1):
    posts.append(f"Posts #{i}")
  
  time.sleep(1)
  
  return JsonResponse({
    "posts": posts
  })