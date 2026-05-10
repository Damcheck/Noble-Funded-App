import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Smartphone, Laptop } from 'lucide-react-native';

export default function SecurityScreen() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUpdatePassword = () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPwd !== confirmPwd) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Your password has been updated securely.', [
      { text: 'OK', onPress: () => { setCurrentPwd(''); setNewPwd(''); setConfirmPwd(''); } }
    ]);
  };

  const toggle2FA = () => {
    if (!is2FAEnabled) {
      Alert.alert('Enable 2FA', 'Are you sure you want to enable Two-Factor Authentication? You will need an authenticator app.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enable', onPress: () => setIs2FAEnabled(true) }
      ]);
    } else {
      setIs2FAEnabled(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Security & Password</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Account Security</Text>
          <Text style={styles.subtitle}>Manage your password and security settings.</Text>
        </View>

        {/* Change Password */}
        <GlassCard style={styles.card} variant="surface">
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Change Password</Text>
            <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
              <Text style={styles.toggleText}>{showPwd ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPwd}
              value={currentPwd}
              onChangeText={setCurrentPwd}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPwd}
              value={newPwd}
              onChangeText={setNewPwd}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPwd}
              value={confirmPwd}
              onChangeText={setConfirmPwd}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <Button label="Update Password" onPress={handleUpdatePassword} style={{ marginTop: 8 }} />
        </GlassCard>

        {/* 2FA Settings */}
        <GlassCard style={styles.card} variant="surface">
          <Text style={styles.cardTitle}>Two-Factor Authentication (2FA)</Text>
          <Text style={styles.cardDesc}>
            Add an extra layer of security to your account by requiring a code from an authenticator app upon login.
          </Text>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Enable Authenticator App</Text>
            <Switch
              value={is2FAEnabled}
              onValueChange={toggle2FA}
              trackColor={{ false: 'rgba(255,255,255,0.1)', true: 'rgba(20,184,166,0.5)' }}
              thumbColor={is2FAEnabled ? Colors.primary : Colors.textMuted}
            />
          </View>
        </GlassCard>

        {/* Active Sessions */}
        <GlassCard style={styles.card} variant="surface">
          <Text style={styles.cardTitle}>Active Sessions</Text>
          <Text style={styles.cardDesc}>Devices currently logged into your account.</Text>

          <View style={styles.sessionItem}>
            <View style={{ marginRight: 16 }}>
              <Smartphone size={24} color={Colors.primary} />
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionName}>iPhone 13 Pro (This Device)</Text>
              <Text style={styles.sessionLoc}>Lagos, Nigeria · Active Now</Text>
            </View>
          </View>

          <View style={[styles.sessionItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={{ marginRight: 16 }}>
              <Laptop size={24} color={Colors.primary} />
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionName}>MacBook Pro - Chrome</Text>
              <Text style={styles.sessionLoc}>Lagos, Nigeria · 2 hours ago</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.revokeText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  
  header: { marginBottom: 24 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary },

  card: { padding: 20, marginBottom: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  toggleText: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.medium },
  cardDesc: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: 16 },

  inputGroup: { marginBottom: 16 },
  label: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 8, fontWeight: Typography.medium },
  input: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.15)', borderRadius: Radius.md, paddingHorizontal: 16, paddingVertical: 12, color: Colors.textPrimary, fontSize: Typography.sm },

  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: Radius.md },
  switchLabel: { fontSize: Typography.sm, color: Colors.textPrimary, fontWeight: Typography.medium },

  sessionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.08)' },
  sessionInfo: { flex: 1 },
  sessionName: { fontSize: Typography.sm, color: Colors.textPrimary, fontWeight: Typography.semibold, marginBottom: 2 },
  sessionLoc: { fontSize: Typography.xs, color: Colors.textMuted },
  revokeText: { fontSize: Typography.xs, color: Colors.danger, fontWeight: Typography.bold },
});
