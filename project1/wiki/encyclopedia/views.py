from django.shortcuts import render
import markdown2
from django import forms
from django.http import HttpResponseRedirect
from django.urls import reverse
from random import random
from math import floor

from . import util

class NewPageForm(forms.Form):
    title = forms.CharField(label="Title")
    content = forms.CharField(label="Content (in Markdown format)")
    
def index(request):
    if request.method == 'POST':
        query = request.POST.get('q')
        if query in [_.lower() for _ in util.list_entries()]:
            return HttpResponseRedirect(reverse('content', args=[query]))
        else:
            return render(request, "encyclopedia/index.html", {
                "entries": filter(lambda title: query in title.lower(), util.list_entries()),
            })
            
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
    })

def content(request, title):
    if util.get_entry(title):
        content = markdown2.markdown(util.get_entry(title))
        return render(request, "encyclopedia/content.html", {
            "title": title,
            "content": content
        })
    return render(request, "encyclopedia/error.html", {
        "error": "404 Page Not Found",
        "error_message": "The page you requested was not found"
    })

def create_new_page(request):
    if request.method == "POST":
        if request.POST.get("title").lower() in [_.lower() for _ in util.list_entries()]:
            return render(request, "encyclopedia/create.html", {
                "error": "The title already exists"
            })
        util.save_entry(request.POST.get("title"), request.POST.get("content"))
        return HttpResponseRedirect(reverse('content', args=[request.POST.get("title")]))
    return render(request, "encyclopedia/create.html")

def edit(request):
    if request.method == "POST":
        util.save_entry(request.POST.get("title"), request.POST.get("content"))
        return HttpResponseRedirect(reverse('content', args=[request.POST.get("title")]))
    return render(request, "encyclopedia/edit.html", {
        "title": request.GET.get("title"),
        "content": util.get_entry(request.GET.get("title"))
    })
    
def random_page(request):
    entries_count = len(util.list_entries())
    return HttpResponseRedirect(reverse('content', args=[util.list_entries()[floor(random() * entries_count)]]))