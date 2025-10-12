import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('Logout') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>JD</ThemedText>
        </View>
        <ThemedText type="title" style={styles.headerTitle}>John Doe</ThemedText>
        <ThemedText style={styles.headerSubtitle}>john.doe@example.com</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Profile Settings</ThemedText>
        
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>Edit Profile</ThemedText>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>Change Password</ThemedText>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Financial Settings</ThemedText>
        
        <TouchableOpacity style={styles.settingItem}>
          <View>
            <ThemedText style={styles.settingLabel}>Currency</ThemedText>
            <ThemedText style={styles.settingValue}>USD ($)</ThemedText>
          </View>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View>
            <ThemedText style={styles.settingLabel}>Budget Period</ThemedText>
            <ThemedText style={styles.settingValue}>Monthly</ThemedText>
          </View>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View>
            <ThemedText style={styles.settingLabel}>Notifications</ThemedText>
            <ThemedText style={styles.settingValue}>Enabled</ThemedText>
          </View>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>App Settings</ThemedText>
        
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>Theme</ThemedText>
          <View style={styles.themeIndicator}>
            <ThemedText style={styles.settingValue}>Light</ThemedText>
          </View>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>Language</ThemedText>
          <ThemedText style={styles.settingValue}>English</ThemedText>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>About</ThemedText>
          <ThemedText style={styles.settingArrow}>›</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>CashMind v1.0.0</ThemedText>
        <ThemedText style={styles.footerText}>Budget Control & Task Manager</ThemedText>
      </View>
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
    alignItems: 'center',
    backgroundColor: '#9C27B0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 24,
    opacity: 0.5,
  },
  themeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
  },
});

