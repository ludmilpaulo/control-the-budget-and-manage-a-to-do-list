import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getFinancialSummary, getTasks, updateTask, FinancialSummary, Task } from '@/services/api';

export default function HomeScreen() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [summaryData, tasksData] = await Promise.all([
        getFinancialSummary(),
        getTasks()
      ]);
      setSummary(summaryData);
      setTasks(tasksData.slice(0, 5)); // Show only first 5 tasks
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const toggleTaskCompletion = async (task: Task) => {
    if (task.id) {
      try {
        await updateTask(task.id, { completed: !task.completed });
        loadData();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF5252';
      case 'medium': return '#FFC107';
      case 'low': return '#4CAF50';
      default: return '#4CAF50';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>CashMind</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Budget & Task Manager</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Financial Summary</ThemedText>
        
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: '#4CAF50' }]}>
            <ThemedText style={styles.summaryLabel}>Money In</ThemedText>
            <ThemedText style={styles.summaryAmount}>${summary?.money_in?.toFixed(2) || '0.00'}</ThemedText>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#FF5252' }]}>
            <ThemedText style={styles.summaryLabel}>Money Out</ThemedText>
            <ThemedText style={styles.summaryAmount}>${summary?.money_out?.toFixed(2) || '0.00'}</ThemedText>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#FF9800' }]}>
            <ThemedText style={styles.summaryLabel}>Borrowed</ThemedText>
            <ThemedText style={styles.summaryAmount}>${summary?.amount_borrowed?.toFixed(2) || '0.00'}</ThemedText>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#2196F3' }]}>
            <ThemedText style={styles.summaryLabel}>Owed to Me</ThemedText>
            <ThemedText style={styles.summaryAmount}>${summary?.amount_owed?.toFixed(2) || '0.00'}</ThemedText>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#9C27B0' }]}>
            <ThemedText style={styles.summaryLabel}>Saved</ThemedText>
            <ThemedText style={styles.summaryAmount}>${summary?.amount_saved?.toFixed(2) || '0.00'}</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Tasks</ThemedText>
        {tasks.length === 0 ? (
          <ThemedText style={styles.emptyText}>No tasks yet. Create one in the To-Do tab!</ThemedText>
        ) : (
          tasks.map((task) => (
            <TouchableOpacity 
              key={task.id} 
              style={styles.taskItem}
              onPress={() => toggleTaskCompletion(task)}
            >
              <View style={styles.taskContent}>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
                <View style={styles.taskDetails}>
                  <ThemedText 
                    style={[styles.taskTitle, task.completed && styles.taskCompleted]}
                  >
                    {task.title}
                  </ThemedText>
                  {task.due_date && (
                    <ThemedText style={styles.taskDate}>Due: {task.due_date}</ThemedText>
                  )}
                </View>
                <View style={styles.checkbox}>
                  {task.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  summaryGrid: {
    gap: 12,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryAmount: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskDate: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 20,
  },
});
