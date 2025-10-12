from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'incomes', views.IncomeViewSet)
router.register(r'expenses', views.ExpenseViewSet)
router.register(r'debts', views.DebtViewSet)
router.register(r'savings', views.SavingsViewSet)
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('financial-summary/', views.financial_summary, name='financial-summary'),
    path('category-expenses/', views.category_expenses, name='category-expenses'),
]

