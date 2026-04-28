from django import views
from django.urls import path
from .views import get_prediction, get_all_solutions, register_user, login_user, get_user_history

urlpatterns = [
    path('predict/', get_prediction),
    path('solutions/', get_all_solutions),
    path('register/', register_user),
    path('login/', login_user),
    path('history/', get_user_history),
]