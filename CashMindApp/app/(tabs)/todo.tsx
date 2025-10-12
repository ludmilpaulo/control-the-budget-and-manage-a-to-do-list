import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, TextInput, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getTasks, createTask, updateTask, deleteTask, Task } from '@/services/api';

export default function TodoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    due_date: '',
  });

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleAddTask = async () => {
    if (!taskForm.title.trim()) return;

    try {
      await createTask({
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        due_date: taskForm.due_date || null,
        completed: false,
      });

      setModalVisible(false);
      setTaskForm({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
      });
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    if (task.id) {
      try {
        await updateTask(task.id, { completed: !task.completed });
        loadTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
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

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);

  return (
    <>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>To-Do List</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            {pendingTasks.length} pending, {completedTasks.length} completed
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Pending Tasks</ThemedText>
          
          {pendingTasks.length === 0 ? (
            <ThemedText style={styles.emptyText}>No pending tasks. Great job!</ThemedText>
          ) : (
            pendingTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity 
                  style={styles.taskContent}
                  onPress={() => toggleTaskCompletion(task)}
                >
                  <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
                  
                  <View style={styles.taskDetails}>
                    <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
                    {task.description ? (
                      <ThemedText style={styles.taskDescription}>{task.description}</ThemedText>
                    ) : null}
                    <View style={styles.taskMeta}>
                      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                        <ThemedText style={styles.priorityText}>{getPriorityLabel(task.priority)}</ThemedText>
                      </View>
                      {task.due_date && (
                        <ThemedText style={styles.dueDate}>Due: {task.due_date}</ThemedText>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.checkbox}>
                    {task.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => task.id && handleDeleteTask(task.id)}
                >
                  <ThemedText style={styles.deleteText}>Delete</ThemedText>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ThemedView>

        {completedTasks.length > 0 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Completed Tasks</ThemedText>
            
            {completedTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity 
                  style={styles.taskContent}
                  onPress={() => toggleTaskCompletion(task)}
                >
                  <View style={[styles.priorityIndicator, { backgroundColor: '#999' }]} />
                  
                  <View style={styles.taskDetails}>
                    <ThemedText style={[styles.taskTitle, styles.completedText]}>{task.title}</ThemedText>
                    {task.description ? (
                      <ThemedText style={[styles.taskDescription, styles.completedText]}>{task.description}</ThemedText>
                    ) : null}
                  </View>
                  
                  <View style={styles.checkbox}>
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => task.id && handleDeleteTask(task.id)}
                >
                  <ThemedText style={styles.deleteText}>Delete</ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </ThemedView>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={styles.fabText}>+</ThemedText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>New Task</ThemedText>
            
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              placeholderTextColor="#999"
              value={taskForm.title}
              onChangeText={(text) => setTaskForm({...taskForm, title: text})}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              value={taskForm.description}
              onChangeText={(text) => setTaskForm({...taskForm, description: text})}
            />
            
            <View style={styles.prioritySelector}>
              <ThemedText style={styles.label}>Priority:</ThemedText>
              <View style={styles.priorityButtons}>
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      { backgroundColor: getPriorityColor(priority) },
                      taskForm.priority === priority && styles.priorityButtonSelected
                    ]}
                    onPress={() => setTaskForm({...taskForm, priority})}
                  >
                    <ThemedText style={styles.priorityButtonText}>
                      {getPriorityLabel(priority)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Due Date (YYYY-MM-DD) - optional"
              placeholderTextColor="#999"
              value={taskForm.due_date}
              onChangeText={(text) => setTaskForm({...taskForm, due_date: text})}
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleAddTask}
              >
                <ThemedText style={styles.buttonText}>Add Task</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF9800',
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
  taskItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  priorityIndicator: {
    width: 4,
    height: 50,
    borderRadius: 2,
    marginRight: 12,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  dueDate: {
    fontSize: 12,
    opacity: 0.7,
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
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  prioritySelector: {
    marginBottom: 12,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  priorityButtonSelected: {
    borderWidth: 3,
    borderColor: '#000',
  },
  priorityButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  saveButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 20,
  },
});

