from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_dummy_data),
    path("transactions/", views.get_transactions, name="get_transactions"),
    path(
        "transactions/<int:id>",
        views.get_transaction,
        name="get_transaction",
    ),
]
