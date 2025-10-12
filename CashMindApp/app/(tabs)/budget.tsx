import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, TextInput, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getFinancialSummary, getCategoryExpenses, getCategories, createExpense, FinancialSummary, Category } from '@/services/api';

export default function BudgetScreen() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    category: '',
    amount: '',
    description: '',
    expense_type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const loadData = async () => {
    try {
      const [summaryData, categoryData, allCategories] = await Promise.all([
        getFinancialSummary(),
        getCategoryExpenses(),
        getCategories()
      ]);
      setSummary(summaryData);
      setCategories(categoryData);
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

  const handleAddExpense = async () => {
    try {
      await createExpense({
        category: expenseForm.category ? parseInt(expenseForm.category) : null,
        amount: parseFloat(expenseForm.amount),
        description: expenseForm.description,
        expense_type: expenseForm.expense_type as 'expense' | 'borrowed' | 'saved',
        date: expenseForm.date
      });
      
      setModalVisible(false);
      setExpenseForm({
        category: '',
        amount: '',
        description: '',
        expense_type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
      loadData();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>Budget</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Track your finances</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Financial Overview</ThemedText>
          
          <View style={styles.overviewRow}>
            <View style={[styles.overviewCard, { backgroundColor: '#4CAF50' }]}>
              <ThemedText style={styles.overviewLabel}>Money In</ThemedText>
              <ThemedText style={styles.overviewAmount}>${summary?.money_in?.toFixed(2) || '0.00'}</ThemedText>
            </View>
            
            <View style={[styles.overviewCard, { backgroundColor: '#FF5252' }]}>
              <ThemedText style={styles.overviewLabel}>Money Out</ThemedText>
              <ThemedText style={styles.overviewAmount}>${summary?.money_out?.toFixed(2) || '0.00'}</ThemedText>
            </View>
          </View>

          <View style={styles.overviewRow}>
            <View style={[styles.overviewCard, { backgroundColor: '#FF9800' }]}>
              <ThemedText style={styles.overviewLabel}>Borrowed</ThemedText>
              <ThemedText style={styles.overviewAmount}>${summary?.amount_borrowed?.toFixed(2) || '0.00'}</ThemedText>
            </View>
            
            <View style={[styles.overviewCard, { backgroundColor: '#9C27B0' }]}>
              <ThemedText style={styles.overviewLabel}>Saved</ThemedText>
              <ThemedText style={styles.overviewAmount}>${summary?.amount_saved?.toFixed(2) || '0.00'}</ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Category Expenses</ThemedText>
          
          {categories.length === 0 ? (
            <ThemedText style={styles.emptyText}>No categories yet. Add some in Django admin!</ThemedText>
          ) : (
            categories.map((category) => (
              <View key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitleRow}>
                    <View style={[styles.categoryColor, { backgroundColor: category.color }]} />
                    <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                  </View>
                  <ThemedText style={styles.categoryAmount}>
                    ${category.total_spent?.toFixed(2)} / ${category.budget_limit?.toFixed(2)}
                  </ThemedText>
                </View>
                
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${Math.min(category.percentage || 0, 100)}%`,
                        backgroundColor: (category.percentage || 0) > 90 ? '#FF5252' : category.color
                      }
                    ]} 
                  />
                </View>
                <ThemedText style={styles.percentageText}>
                  {category.percentage?.toFixed(0)}% used
                </ThemedText>
              </View>
            ))
          )}
        </ThemedView>

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
            <ThemedText type="subtitle" style={styles.modalTitle}>Add Expense</ThemedText>
            
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#999"
              value={expenseForm.description}
              onChangeText={(text) => setExpenseForm({...expenseForm, description: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Amount"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={expenseForm.amount}
              onChangeText={(text) => setExpenseForm({...expenseForm, amount: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Category ID (optional)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={expenseForm.category}
              onChangeText={(text) => setExpenseForm({...expenseForm, category: text})}
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
                onPress={handleAddExpense}
              >
                <ThemedText style={styles.buttonText}>Save</ThemedText>
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
    backgroundColor: '#2196F3',
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
  overviewRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  overviewCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  overviewLabel: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 4,
  },
  overviewAmount: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
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
    backgroundColor: '#2196F3',
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

