from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CVViewSet, LoginView, LogoutView

router = DefaultRouter()
router.register(r'cvs', CVViewSet, basename='cv')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]