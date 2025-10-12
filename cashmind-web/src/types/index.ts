export interface FinancialSummary {
  moneyIn: number;
  moneyOut: number;
  amountBorrowed: number;
  amountOwed: number;
  amountSaved: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  completed: boolean;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  budgetLimit: number;
}

export interface CategoryExpense extends Category {
  totalSpent: number;
  percentage: number;
}

export interface Expense {
  id: number;
  amount: number;
  description: string;
  expenseType: 'expense' | 'borrowed' | 'saved';
  date: string;
  categoryName?: string;
}

export interface Income {
  id: number;
  amount: number;
  description: string;
  date: string;
}

export interface Debt {
  id: number;
  amount: number;
  description: string;
  debtType: 'borrowed' | 'owed';
  dueDate: string | null;
  isPaid: boolean;
}

