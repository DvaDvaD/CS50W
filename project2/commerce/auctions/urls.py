from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_listing", views.create_listing, name="create_listing"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("categories", views.categories, name="categories"),
    path("categories/<str:code>", views.category, name="category"),
    path("listing/<int:listing_id>", views.listing, name="listing"),
    path("close_listing/<int:listing_id>", views.close_listing, name='close_listing'),
    path("add_comment/<int:listing_id>", views.add_comment, name="add_comment")
]
