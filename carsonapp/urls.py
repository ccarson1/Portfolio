from django.urls import path
from . import views
from .views import Project
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.home_page, name='web-home'),
    path('project/<int:id>/', views.project_page, name='web-project'),
    path('resume', views.resume_page, name='web-resume'),
    path('about', views.about_page, name='web-about'),
    path('upload/', views.upload_project, name='upload_project'),
    path('success/', views.upload_success, name='project_success'), 
    path('login/', auth_views.LoginView.as_view(template_name='carsonapp/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('project/<int:pk>/edit/', views.edit_project, name='edit_project'),

]
