from django.contrib import admin

from .models import *

# Register your models here.

class UserAdmin(admin.ModelAdmin):
  list_display = ['username', 'first_name', 'last_name', 'email', 'is_staff']
  

class AuctionListingAdmin(admin.ModelAdmin):
  filter_horizontal = ['watchlisted_by']

admin.site.register(User, UserAdmin)
admin.site.register(AuctionListing, AuctionListingAdmin)
admin.site.register(Bid)
admin.site.register(Comment)