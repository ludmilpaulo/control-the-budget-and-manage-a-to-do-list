'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_TASKS } from '@/lib/graphql/queries';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '@/lib/graphql/mutations';
import { Task } from '@/types';

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
  });

  const { data, loading, refetch } = useQuery<{ allTasks: Task[] }>(GET_ALL_TASKS);

  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      refetch();
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => refetch(),
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => refetch(),
  });

  const tasks = data?.allTasks || [];
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({
      variables: {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate || null,
      },
    });
  };

  const toggleTask = (task: Task) => {
    updateTask({
      variables: {
        id: task.id,
        completed: !task.completed,
      },
    });
  };

  const handleDeleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask({ variables: { id } });
    }
  };

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Task Manager</h1>
        <p className="text-lg opacity-90">
          {pendingTasks.length} pending, {completedTasks.length} completed
        </p>
      </div>

      {/* Pending Tasks */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Tasks</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : pendingTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <p className="text-gray-500 text-lg">No pending tasks. Great job!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button
                      onClick={() => toggleTask(task)}
                      className="mt-1 w-6 h-6 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
                    >
                      {task.completed && <span className="text-green-600 text-sm">✓</span>}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                        ></div>
                        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                      </div>

                      {task.description && (
                        <p className="text-gray-600 mb-2">{task.description}</p>
                      )}

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        {task.dueDate && (
                          <span className="text-sm text-gray-500">📅 Due: {task.dueDate}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="ml-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Completed Tasks</h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 rounded-xl p-5 shadow-md opacity-75"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button
                      onClick={() => toggleTask(task)}
                      className="mt-1 w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </button>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-600 line-through">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-500 line-through mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="ml-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl font-bold"
      >
        +
      </button>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority })}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        formData.priority === priority
                          ? priority === 'high'
                            ? 'bg-red-500 text-white'
                            : priority === 'medium'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
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
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

