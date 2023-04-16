from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import *


def index(request):
    return render(request, "auctions/index.html", {
        "listings": AuctionListing.objects.filter(closed=False).all()
    })


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


@login_required
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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


@login_required
def create_listing(request):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        bid = float(request.POST['bid'])
        image_URL = request.POST['imageURL']
        category = request.POST['category']
        
        if not (title and description and bid):
            return render(request, "auctions/create_listing.html", {
                "categories": AuctionListing.CATEGORY_CHOICES,
                "message": "Title, description, and starting bid are required"
            })
        
        new_listing = AuctionListing(title=title, description=description, bid=bid, image_URL=image_URL, category=category, lister=request.user)
        new_listing.save()
        
        return HttpResponseRedirect(reverse('index'))
    
    return render(request, "auctions/create_listing.html", {
        "categories": AuctionListing.CATEGORY_CHOICES
    })


@login_required
def watchlist(request):
    if request.method == "POST":
        listing_id = request.POST['listing_id']
        
        try:
            listing = request.user.watchlist.get(id=listing_id)
        except AuctionListing.DoesNotExist:
            listing = None
            
        if listing:
            request.user.watchlist.remove(listing)
        else:
            request.user.watchlist.add(AuctionListing.objects.get(id=listing_id))
            
        return render(request, "auctions/watchlist.html", {
            "listings": request.user.watchlist.all()
        })
    
    return render(request, "auctions/watchlist.html", {
        "listings": request.user.watchlist.all()
    })


@login_required
def categories(request):
    return render(request, "auctions/categories.html", {
        "categories": AuctionListing.CATEGORY_CHOICES
    })
    

@login_required
def category(request, code):
    for choice in AuctionListing.CATEGORY_CHOICES:
        if choice[0] == code:
            category = choice[1]
            break
    
    return render(request, "auctions/category.html", {
        "listings": AuctionListing.objects.filter(category=code),
        "category": category
    })
    

@login_required
def listing(request, listing_id):
    listing = AuctionListing.objects.get(id=listing_id)
    
    try: 
        current_bid = listing.bids.get(bid=listing.bid)
    except Bid.DoesNotExist:
        current_bid = None
    
    if request.method == "POST":
        bid = float(request.POST.get('bid'))
        if bid > listing.bid:
            listing.bid = bid
            listing.save()
            new_bid = Bid(bidder=request.user, listing=listing, bid=bid)
            new_bid.save()
            current_bid = new_bid
        else:
            return render(request, "auctions/listing.html", {
                "listing": listing,
                "time_listed": listing.time_created,
                "watchlisted": listing in request.user.watchlist.all(),
                "closed": listing.closed,
                "current_bid": current_bid,
                "comments": listing.comments.all(),
                "message": "Placed bid must be more than the current bid"
            })
    
    return render(request, "auctions/listing.html", {
        "listing": listing,
        "time_listed": listing.time_created,
        "watchlisted": listing in request.user.watchlist.all(),
        "closed": listing.closed,
        "current_bid": current_bid,
        "comments": listing.comments.all()
    })
    
    
def close_listing(request, listing_id):
    if request.method == 'POST':
        listing = AuctionListing.objects.get(id=listing_id)
        listing.closed = True
        listing.save()
        return HttpResponseRedirect(reverse('listing', args=[listing_id]))
    return HttpResponseRedirect(reverse('index'))


def add_comment(request, listing_id):
    if request.method == "POST":
        comment = request.POST.get('comment')
        listing = AuctionListing.objects.get(id=listing_id)
        new_comment = Comment(comment=comment, commenter=request.user, listing=listing)
        new_comment.save()
        
        return HttpResponseRedirect(reverse('listing', args=[listing_id]))
    return HttpResponseRedirect(reverse('index'))