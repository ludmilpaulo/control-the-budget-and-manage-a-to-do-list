'use client';

import { useQuery } from '@apollo/client';
import { GET_FINANCIAL_SUMMARY, GET_ALL_TASKS } from '@/lib/graphql/queries';
import { FinancialSummary, Task } from '@/types';
import Link from 'next/link';

export default function HomePage() {
  const { data: summaryData, loading: summaryLoading } = useQuery<{
    financialSummary: FinancialSummary;
  }>(GET_FINANCIAL_SUMMARY);

  const { data: tasksData, loading: tasksLoading } = useQuery<{
    allTasks: Task[];
  }>(GET_ALL_TASKS);

  const summary = summaryData?.financialSummary;
  const tasks = tasksData?.allTasks?.slice(0, 5) || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome to CashMind</h1>
        <p className="text-lg opacity-90">Your personal budget and task manager</p>
      </div>

      {/* Financial Summary */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Summary</h2>
        {summaryLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-sm opacity-90 mb-1">Money In</p>
              <p className="text-3xl font-bold">${summary?.moneyIn?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-sm opacity-90 mb-1">Money Out</p>
              <p className="text-3xl font-bold">${summary?.moneyOut?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-sm opacity-90 mb-1">Borrowed</p>
              <p className="text-3xl font-bold">${summary?.amountBorrowed?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-sm opacity-90 mb-1">Owed to Me</p>
              <p className="text-3xl font-bold">${summary?.amountOwed?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-sm opacity-90 mb-1">Saved</p>
              <p className="text-3xl font-bold">${summary?.amountSaved?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        )}
      </section>

      {/* Upcoming Tasks */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Tasks</h2>
          <Link
            href="/tasks"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {tasksLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
            <Link
              href="/tasks"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Create Task
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border-l-4"
                style={{
                  borderLeftColor:
                    task.priority === 'high'
                      ? '#ef4444'
                      : task.priority === 'medium'
                      ? '#f59e0b'
                      : '#10b981',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                    ></div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-gray-800 ${
                          task.completed ? 'line-through opacity-60' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.dueDate && (
                        <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                    {task.completed && (
                      <span className="text-green-600 text-xl">✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/budget"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-green-500 group"
          >
            <div className="text-4xl mb-2">💰</div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
              Add Expense
            </h3>
            <p className="text-gray-600 mt-1">Track your spending</p>
          </Link>

          <Link
            href="/tasks"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-blue-500 group"
          >
            <div className="text-4xl mb-2">✓</div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              Create Task
            </h3>
            <p className="text-gray-600 mt-1">Stay organized</p>
          </Link>

          <Link
            href="/profile"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-purple-500 group"
          >
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              Settings
            </h3>
            <p className="text-gray-600 mt-1">Customize your experience</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
