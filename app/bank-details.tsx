import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Building2, Check, Plus, Trash2 } from 'lucide-react-native';
import { TextInput } from 'react-native';

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
}

export default function BankDetailsScreen() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: 'bank_1',
      bankName: 'GTBank',
      accountName: 'Olatunbosun Damola',
      accountNumber: '0123456789',
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleAdd = () => {
    if (!bankName || !accountName || !accountNumber || accountNumber.length < 10) {
      Alert.alert('Error', 'Please fill all fields with a valid 10-digit account number.');
      return;
    }
    const newAccount: BankAccount = {
      id: `bank_${Date.now()}`,
      bankName,
      accountName,
      accountNumber,
      isDefault: accounts.length === 0,
    };
    setAccounts([...accounts, newAccount]);
    setBankName('');
    setAccountName('');
    setAccountNumber('');
    setShowForm(false);
  };

  const handleSetDefault = (id: string) => {
    setAccounts((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const handleDelete = (id: string) => {
    Alert.alert('Remove Bank Account', 'Are you sure you want to remove this bank account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setAccounts((prev) => prev.filter((a) => a.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Bank Details</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Manage your bank accounts for payout withdrawals.</Text>

        {/* Existing Accounts */}
        {accounts.map((account) => (
          <GlassCard key={account.id} style={styles.bankCard} variant={account.isDefault ? 'default' : 'surface'}>
            <View style={styles.bankHeader}>
              <View style={styles.bankIconWrap}>
                <Building2 size={20} color={Colors.primary} />
              </View>
              <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{account.bankName}</Text>
                <Text style={styles.bankAccountName}>{account.accountName}</Text>
                <Text style={styles.bankNumber}>{account.accountNumber}</Text>
              </View>
              {account.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <View style={styles.bankActions}>
              {!account.isDefault && (
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleSetDefault(account.id)}>
                  <Check size={14} color={Colors.primary} />
                  <Text style={styles.actionBtnText}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(account.id)}>
                <Trash2 size={14} color="#f87171" />
                <Text style={styles.deleteBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        ))}

        {/* Add New Account */}
        {!showForm ? (
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)} activeOpacity={0.8}>
            <LinearGradient colors={['rgba(13,148,136,0.2)', 'rgba(13,148,136,0.05)']} style={styles.addBtnInner}>
              <Plus size={20} color={Colors.primary} />
              <Text style={styles.addBtnText}>Add New Bank Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <GlassCard style={styles.card} variant="surface">
            <Text style={styles.formTitle}>New Bank Account</Text>

            <Text style={styles.label}>Bank Name</Text>
            <TextInput
              style={styles.input}
              value={bankName}
              onChangeText={setBankName}
              placeholder="e.g. GTBank, Access, Opay"
              placeholderTextColor={Colors.textMuted}
            />

            <Text style={styles.label}>Account Name</Text>
            <TextInput
              style={styles.input}
              value={accountName}
              onChangeText={setAccountName}
              placeholder="Name on the account"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholder="10-digit number"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              maxLength={10}
            />

            <View style={styles.formBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowForm(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd} activeOpacity={0.85} style={{ flex: 1 }}>
                <LinearGradient
                  colors={['#00f0ff', '#00d4d4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveBtn}
                >
                  <Text style={styles.saveBtnText}>Add Account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </GlassCard>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 8 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, marginBottom: 20 },

  bankCard: { padding: 18, marginBottom: 14 },
  bankHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  bankIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(13,148,136,0.15)', alignItems: 'center', justifyContent: 'center' },
  bankInfo: { flex: 1 },
  bankName: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  bankAccountName: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
  bankNumber: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  defaultBadge: { backgroundColor: 'rgba(13,148,136,0.2)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.3)', borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 4 },
  defaultText: { fontSize: 10, color: Colors.primary, fontWeight: '700' },
  bankActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 10, borderRadius: Radius.sm, borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)' },
  actionBtnText: { fontSize: Typography.xs, color: Colors.primary, fontWeight: Typography.semibold },
  deleteBtn: { borderColor: 'rgba(248,113,113,0.2)' },
  deleteBtnText: { fontSize: Typography.xs, color: '#f87171', fontWeight: Typography.semibold },

  addBtn: { borderRadius: Radius.md, overflow: 'hidden', marginBottom: 16 },
  addBtnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)', borderRadius: Radius.md },
  addBtnText: { fontSize: Typography.base, color: Colors.primary, fontWeight: Typography.semibold },

  card: { padding: 20, marginBottom: 16 },
  formTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 16 },
  label: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 8, fontWeight: Typography.medium },
  input: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.18)', borderRadius: Radius.md, paddingHorizontal: 16, paddingVertical: 14, color: Colors.textPrimary, fontSize: Typography.base, marginBottom: 16 },

  formBtns: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 50, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)' },
  cancelBtnText: { color: Colors.textSecondary, fontSize: 15, fontWeight: '600' },
  saveBtn: { paddingVertical: 14, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { color: '#041c20', fontSize: 15, fontWeight: '700' },
});
