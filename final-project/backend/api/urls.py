from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("", views.api_root),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),
    path("users/", views.UserList.as_view(), name="users"),
    path("users/current_user/", views.current_user, name="current_user"),
    path("user_details/", views.UserDetailList.as_view(), name="user_details"),
    path("change_username/", views.change_username, name="change_username"),
    path("accounts/", views.AccountList.as_view(), name="accounts"),
    path("accounts/<int:id>", views.AccountDetail.as_view(), name="account_detail"),
    path("transactions/", views.get_transactions, name="transactions"),
    path(
        "transactions/<int:id>/",
        views.get_transaction,
        name="transaction_detail",
    ),
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),
]
