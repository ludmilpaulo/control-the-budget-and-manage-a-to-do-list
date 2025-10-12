import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Category, Income, Expense, Debt, Savings, Task
from django.db.models import Sum

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = '__all__'

class IncomeType(DjangoObjectType):
    class Meta:
        model = Income
        fields = '__all__'

class ExpenseType(DjangoObjectType):
    class Meta:
        model = Expense
        fields = '__all__'
    
    category_name = graphene.String()
    
    def resolve_category_name(self, info):
        return self.category.name if self.category else None

class DebtType(DjangoObjectType):
    class Meta:
        model = Debt
        fields = '__all__'

class SavingsType(DjangoObjectType):
    class Meta:
        model = Savings
        fields = '__all__'

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = '__all__'

class FinancialSummaryType(graphene.ObjectType):
    money_in = graphene.Float()
    money_out = graphene.Float()
    amount_borrowed = graphene.Float()
    amount_owed = graphene.Float()
    amount_saved = graphene.Float()

class CategoryExpenseType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    color = graphene.String()
    budget_limit = graphene.Float()
    total_spent = graphene.Float()
    percentage = graphene.Float()

class Query(graphene.ObjectType):
    # Categories
    all_categories = graphene.List(CategoryType)
    category = graphene.Field(CategoryType, id=graphene.Int())
    
    # Incomes
    all_incomes = graphene.List(IncomeType)
    income = graphene.Field(IncomeType, id=graphene.Int())
    
    # Expenses
    all_expenses = graphene.List(ExpenseType)
    expense = graphene.Field(ExpenseType, id=graphene.Int())
    
    # Debts
    all_debts = graphene.List(DebtType)
    debt = graphene.Field(DebtType, id=graphene.Int())
    
    # Savings
    all_savings = graphene.List(SavingsType)
    saving = graphene.Field(SavingsType, id=graphene.Int())
    
    # Tasks
    all_tasks = graphene.List(TaskType)
    task = graphene.Field(TaskType, id=graphene.Int())
    
    # Special queries
    financial_summary = graphene.Field(FinancialSummaryType)
    category_expenses = graphene.List(CategoryExpenseType)
    
    # Resolvers
    def resolve_all_categories(root, info):
        return Category.objects.all()
    
    def resolve_category(root, info, id):
        return Category.objects.get(pk=id)
    
    def resolve_all_incomes(root, info):
        return Income.objects.all()
    
    def resolve_income(root, info, id):
        return Income.objects.get(pk=id)
    
    def resolve_all_expenses(root, info):
        return Expense.objects.all()
    
    def resolve_expense(root, info, id):
        return Expense.objects.get(pk=id)
    
    def resolve_all_debts(root, info):
        return Debt.objects.all()
    
    def resolve_debt(root, info, id):
        return Debt.objects.get(pk=id)
    
    def resolve_all_savings(root, info):
        return Savings.objects.all()
    
    def resolve_saving(root, info, id):
        return Savings.objects.get(pk=id)
    
    def resolve_all_tasks(root, info):
        return Task.objects.all()
    
    def resolve_task(root, info, id):
        return Task.objects.get(pk=id)
    
    def resolve_financial_summary(root, info):
        money_in = Income.objects.aggregate(total=Sum('amount'))['total'] or 0
        money_out = Expense.objects.filter(expense_type='expense').aggregate(total=Sum('amount'))['total'] or 0
        amount_borrowed = Debt.objects.filter(debt_type='borrowed', is_paid=False).aggregate(total=Sum('amount'))['total'] or 0
        amount_owed = Debt.objects.filter(debt_type='owed', is_paid=False).aggregate(total=Sum('amount'))['total'] or 0
        amount_saved = Savings.objects.aggregate(total=Sum('amount'))['total'] or 0
        
        return FinancialSummaryType(
            money_in=money_in,
            money_out=money_out,
            amount_borrowed=amount_borrowed,
            amount_owed=amount_owed,
            amount_saved=amount_saved
        )
    
    def resolve_category_expenses(root, info):
        categories = Category.objects.all()
        result = []
        
        for category in categories:
            total_spent = Expense.objects.filter(
                category=category,
                expense_type='expense'
            ).aggregate(total=Sum('amount'))['total'] or 0
            
            percentage = (total_spent / category.budget_limit * 100) if category.budget_limit > 0 else 0
            
            result.append(CategoryExpenseType(
                id=category.id,
                name=category.name,
                color=category.color,
                budget_limit=category.budget_limit,
                total_spent=total_spent,
                percentage=percentage
            ))
        
        return result

class CreateCategory(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        budget_limit = graphene.Float(required=True)
        color = graphene.String()
    
    category = graphene.Field(CategoryType)
    
    def mutate(self, info, name, budget_limit, color="#4CAF50"):
        category = Category.objects.create(
            name=name,
            budget_limit=budget_limit,
            color=color
        )
        return CreateCategory(category=category)

class CreateIncome(graphene.Mutation):
    class Arguments:
        amount = graphene.Float(required=True)
        description = graphene.String(required=True)
        date = graphene.String(required=True)
    
    income = graphene.Field(IncomeType)
    
    def mutate(self, info, amount, description, date):
        income = Income.objects.create(
            amount=amount,
            description=description,
            date=date
        )
        return CreateIncome(income=income)

class CreateExpense(graphene.Mutation):
    class Arguments:
        amount = graphene.Float(required=True)
        description = graphene.String(required=True)
        date = graphene.String(required=True)
        category_id = graphene.Int()
        expense_type = graphene.String()
    
    expense = graphene.Field(ExpenseType)
    
    def mutate(self, info, amount, description, date, category_id=None, expense_type='expense'):
        expense = Expense.objects.create(
            amount=amount,
            description=description,
            date=date,
            category_id=category_id,
            expense_type=expense_type
        )
        return CreateExpense(expense=expense)

class CreateTask(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        priority = graphene.String()
        due_date = graphene.String()
    
    task = graphene.Field(TaskType)
    
    def mutate(self, info, title, description='', priority='medium', due_date=None):
        task = Task.objects.create(
            title=title,
            description=description,
            priority=priority,
            due_date=due_date
        )
        return CreateTask(task=task)

class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        priority = graphene.String()
        due_date = graphene.String()
        completed = graphene.Boolean()
    
    task = graphene.Field(TaskType)
    
    def mutate(self, info, id, **kwargs):
        task = Task.objects.get(pk=id)
        for key, value in kwargs.items():
            if value is not None:
                setattr(task, key, value)
        task.save()
        return UpdateTask(task=task)

class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, id):
        task = Task.objects.get(pk=id)
        task.delete()
        return DeleteTask(success=True)

class Mutation(graphene.ObjectType):
    create_category = CreateCategory.Field()
    create_income = CreateIncome.Field()
    create_expense = CreateExpense.Field()
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

