from django.db import models

class Expend(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=100)
    date = models.DateField()
    task = models.ForeignKey('Task', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.description

class Income(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=100)
    date = models.DateField()
    task = models.ForeignKey('Task', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.description

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=100)
    date = models.DateField()
    task = models.ForeignKey('Task', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.description

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    alerts = models.ManyToManyField('Alert', blank=True)

    def __str__(self):
        return self.title

class Alert(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    max_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    min_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.title
