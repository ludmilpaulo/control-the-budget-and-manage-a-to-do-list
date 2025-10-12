// API Configuration and Service Functions
const API_BASE_URL = 'http://localhost:8000/api';

export interface FinancialSummary {
  money_in: number;
  money_out: number;
  amount_borrowed: number;
  amount_owed: number;
  amount_saved: number;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  completed: boolean;
}

export interface Expense {
  id?: number;
  category: number | null;
  amount: number;
  description: string;
  expense_type: 'expense' | 'borrowed' | 'saved';
  date: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  budget_limit: number;
  total_spent?: number;
  percentage?: number;
}

export interface Debt {
  id?: number;
  amount: number;
  description: string;
  debt_type: 'borrowed' | 'owed';
  due_date: string | null;
  is_paid: boolean;
}

// Financial Summary
export const getFinancialSummary = async (): Promise<FinancialSummary> => {
  const response = await fetch(`${API_BASE_URL}/financial-summary/`);
  return response.json();
};

// Tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks/`);
  const data = await response.json();
  return data.results || data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/tasks/${id}/`, { method: 'DELETE' });
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  const data = await response.json();
  return data.results || data;
};

export const getCategoryExpenses = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/category-expenses/`);
  return response.json();
};

// Expenses
export const getExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(`${API_BASE_URL}/expenses/`);
  const data = await response.json();
  return data.results || data;
};

export const createExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  return response.json();
};

// Debts
export const getDebts = async (): Promise<Debt[]> => {
  const response = await fetch(`${API_BASE_URL}/debts/`);
  const data = await response.json();
  return data.results || data;
};

export const createDebt = async (debt: Omit<Debt, 'id'>): Promise<Debt> => {
  const response = await fetch(`${API_BASE_URL}/debts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(debt),
  });
  return response.json();
};

