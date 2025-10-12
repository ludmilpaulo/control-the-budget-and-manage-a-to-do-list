'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FINANCIAL_SUMMARY, GET_CATEGORY_EXPENSES } from '@/lib/graphql/queries';
import { CREATE_EXPENSE } from '@/lib/graphql/mutations';
import { FinancialSummary, CategoryExpense } from '@/types';

export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
  });

  const { data: summaryData, loading: summaryLoading, refetch: refetchSummary } = useQuery<{
    financialSummary: FinancialSummary;
  }>(GET_FINANCIAL_SUMMARY);

  const { data: categoriesData, loading: categoriesLoading, refetch: refetchCategories } = useQuery<{
    categoryExpenses: CategoryExpense[];
  }>(GET_CATEGORY_EXPENSES);

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted: () => {
      refetchSummary();
      refetchCategories();
      setIsModalOpen(false);
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
      });
    },
  });

  const summary = summaryData?.financialSummary;
  const categories = categoriesData?.categoryExpenses || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExpense({
      variables: {
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        expenseType: 'expense',
      },
    });
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Budget Tracker</h1>
        <p className="text-lg opacity-90">Monitor and manage your expenses</p>
      </div>

      {/* Financial Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Overview</h2>
        {summaryLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Money In</p>
              <p className="text-3xl font-bold">${summary?.moneyIn?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Money Out</p>
              <p className="text-3xl font-bold">${summary?.moneyOut?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Borrowed</p>
              <p className="text-3xl font-bold">${summary?.amountBorrowed?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Saved</p>
              <p className="text-3xl font-bold">${summary?.amountSaved?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        )}
      </section>

      {/* Category Expenses */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Category Breakdown</h2>
        {categoriesLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <p className="text-gray-500 text-lg">No categories yet. Add some in Django admin!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    ${category.totalSpent?.toFixed(2)} / ${category.budgetLimit?.toFixed(2)}
                  </p>
                </div>

                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(category.percentage || 0, 100)}%`,
                      backgroundColor:
                        (category.percentage || 0) > 90
                          ? '#ef4444'
                          : category.color,
                    }}
                  ></div>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {category.percentage?.toFixed(1)}% used
                  {(category.percentage || 0) > 90 && (
                    <span className="ml-2 text-red-600 font-medium">⚠️ Budget exceeded!</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl font-bold"
      >
        +
      </button>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category (Optional)
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

