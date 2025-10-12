from django.contrib import admin
from .models import Category, Income, Expense, Debt, Savings, Task

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'budget_limit', 'color']

@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ['description', 'amount', 'date', 'user']
    list_filter = ['date']

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['description', 'amount', 'expense_type', 'category', 'date', 'user']
    list_filter = ['expense_type', 'category', 'date']

@admin.register(Debt)
class DebtAdmin(admin.ModelAdmin):
    list_display = ['description', 'amount', 'debt_type', 'due_date', 'is_paid', 'user']
    list_filter = ['debt_type', 'is_paid']

@admin.register(Savings)
class SavingsAdmin(admin.ModelAdmin):
    list_display = ['description', 'amount', 'date', 'user']
    list_filter = ['date']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'priority', 'due_date', 'completed', 'user']
    list_filter = ['priority', 'completed', 'due_date']
