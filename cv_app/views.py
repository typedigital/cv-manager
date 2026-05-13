from django.contrib.auth import authenticate, login, logout as django_logout
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from .models import CV
from .serializers import CVSerializer


class CVViewSet(viewsets.ModelViewSet):
    queryset = CV.objects.all()
    serializer_class = CVSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response(
                {'error': 'Zugangsdaten ungültig'},
                status=status.HTTP_400_BAD_REQUEST
            )

        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'is_staff': user.is_staff,
        })


class LogoutView(APIView):
    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        django_logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


def admin_logout_view(request):
    if request.user.is_authenticated:
        Token.objects.filter(user=request.user).delete()
    django_logout(request)
    return redirect('/?logout=1')