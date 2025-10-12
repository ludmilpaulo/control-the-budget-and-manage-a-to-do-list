from rest_framework import serializers
from .models import Category, Income, Expense, Debt, Savings, Task

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Expense
        fields = '__all__'

class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = '__all__'

class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class FinancialSummarySerializer(serializers.Serializer):
    money_in = serializers.DecimalField(max_digits=10, decimal_places=2)
    money_out = serializers.DecimalField(max_digits=10, decimal_places=2)
    amount_borrowed = serializers.DecimalField(max_digits=10, decimal_places=2)
    amount_owed = serializers.DecimalField(max_digits=10, decimal_places=2)
    amount_saved = serializers.DecimalField(max_digits=10, decimal_places=2)

