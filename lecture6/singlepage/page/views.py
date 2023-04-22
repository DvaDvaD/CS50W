from django.shortcuts import render
from django.http import HttpResponse, Http404

# Create your views here.
def index(request):
  return render(request, 'page/index.html')


def sections(request, num):
  texts = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer eget. Bibendum enim facilisis gravida neque convallis a cras semper. Id eu nisl nunc mi ipsum faucibus vitae. Dignissim diam quis enim lobortis scelerisque. Integer eget aliquet nibh praesent tristique.',
    'Ultricies mi eget mauris pharetra et ultrices neque ornare. Consequat mauris nunc congue nisi vitae suscipit tellus. Sed libero enim sed faucibus. Ultrices neque ornare aenean euismod elementum nisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
    'Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. At quis risus sed vulputate. Sodales ut etiam sit amet nisl purus in mollis.'
  ]
  
  if num in range(1, 4):
    return HttpResponse(texts[num - 1])
  else:
    raise Http404('Section does not exist!')