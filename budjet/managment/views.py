from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from datetime import datetime
from .models import Category, Income, Expense, Debt, Savings, Task
from .serializers import (
    CategorySerializer, IncomeSerializer, ExpenseSerializer,
    DebtSerializer, SavingsSerializer, TaskSerializer,
    FinancialSummarySerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debt.objects.all()
    serializer_class = DebtSerializer

class SavingsViewSet(viewsets.ModelViewSet):
    queryset = Savings.objects.all()
    serializer_class = SavingsSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

@api_view(['GET'])
def financial_summary(request):
    """Get financial summary with all totals"""
    
    # Calculate total income
    money_in = Income.objects.aggregate(total=Sum('amount'))['total'] or 0
    
    # Calculate total expenses
    money_out = Expense.objects.filter(expense_type='expense').aggregate(total=Sum('amount'))['total'] or 0
    
    # Calculate amount borrowed (what user borrowed from others)
    amount_borrowed = Debt.objects.filter(debt_type='borrowed', is_paid=False).aggregate(total=Sum('amount'))['total'] or 0
    
    # Calculate amount owed (what others owe to user)
    amount_owed = Debt.objects.filter(debt_type='owed', is_paid=False).aggregate(total=Sum('amount'))['total'] or 0
    
    # Calculate total savings
    amount_saved = Savings.objects.aggregate(total=Sum('amount'))['total'] or 0
    
    summary = {
        'money_in': money_in,
        'money_out': money_out,
        'amount_borrowed': amount_borrowed,
        'amount_owed': amount_owed,
        'amount_saved': amount_saved
    }
    
    serializer = FinancialSummarySerializer(summary)
    return Response(serializer.data)

@api_view(['GET'])
def category_expenses(request):
    """Get expenses grouped by category"""
    categories = Category.objects.all()
    result = []
    
    for category in categories:
        total_spent = Expense.objects.filter(
            category=category,
            expense_type='expense'
        ).aggregate(total=Sum('amount'))['total'] or 0
        
        result.append({
            'id': category.id,
            'name': category.name,
            'color': category.color,
            'budget_limit': category.budget_limit,
            'total_spent': total_spent,
            'percentage': (total_spent / category.budget_limit * 100) if category.budget_limit > 0 else 0
        })
    
    return Response(result)
