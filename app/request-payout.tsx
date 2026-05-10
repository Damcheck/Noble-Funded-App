import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Send, CreditCard, Building2, CheckCircle2 } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { formatCurrency } from '@/constants/data';

export default function RequestPayoutScreen() {
  const { accounts } = useAppStore();
  const fundedAccount = accounts.find((a) => a.status === 'funded') ?? accounts[0];

  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const maxPayout = fundedAccount ? fundedAccount.balance * 0.8 : 0;

  const handleSubmit = async () => {
    const amt = parseFloat(amount.replace(/,/g, ''));
    if (!amount || isNaN(amt) || amt <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }
    if (amt > maxPayout) {
      Alert.alert('Error', `Maximum payout is ${formatCurrency(maxPayout, 'NGN')} (80% profit split).`);
      return;
    }
    if (!bankName || !accountName || !accountNumber) {
      Alert.alert('Error', 'Please fill in all bank details.');
      return;
    }
    if (accountNumber.length < 10) {
      Alert.alert('Error', 'Account number must be 10 digits.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
        <View style={styles.successWrap}>
          <LinearGradient colors={['rgba(13,148,136,0.3)', 'transparent']} style={styles.successGlow} />
          <View style={styles.successIcon}>
            <LinearGradient colors={['#0d9488', '#5eead4']} style={styles.successIconInner}>
              <CheckCircle2 size={40} color="#041c20" />
            </LinearGradient>
          </View>
          <Text style={styles.successTitle}>Payout Requested!</Text>
          <Text style={styles.successSub}>
            Your payout of {formatCurrency(parseFloat(amount.replace(/,/g, '')), 'NGN')} has been submitted successfully.{'\n'}
            Processing typically takes 24–48 hours.
          </Text>
          <TouchableOpacity onPress={() => router.replace('/payouts')} activeOpacity={0.85}>
            <LinearGradient
              colors={['#00f0ff', '#00d4d4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.successBtn}
            >
              <Text style={styles.successBtnText}>View Payout History</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
            <Text style={styles.backLink}>← Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Request Payout</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Account Summary */}
        <GlassCard noPadding style={styles.summaryCard}>
          <LinearGradient colors={['rgba(13,148,136,0.25)', 'rgba(6,15,14,0.3)']} style={styles.summaryGradient}>
            <View style={styles.summaryShimmer} />
            <Text style={styles.summaryLabel}>Available for Payout (80% split)</Text>
            <Text style={styles.summaryBalance}>{formatCurrency(maxPayout, 'NGN')}</Text>
            <Text style={styles.summaryAccount}>Account: {fundedAccount?.accountNumber}</Text>
          </LinearGradient>
        </GlassCard>

        {/* Amount */}
        <GlassCard style={styles.card} variant="surface">
          <View style={styles.cardHeaderRow}>
            <Send size={18} color={Colors.primary} />
            <Text style={styles.cardTitle}>Payout Amount</Text>
          </View>
          <Text style={styles.fieldLabel}>Amount (NGN)</Text>
          <View style={styles.amountWrap}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.quickAmounts}>
            {['50,000', '100,000', '200,000'].map((q) => (
              <TouchableOpacity
                key={q}
                style={styles.quickChip}
                onPress={() => setAmount(q)}
              >
                <Text style={styles.quickChipText}>₦{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Bank Details */}
        <GlassCard style={styles.card} variant="surface">
          <View style={styles.cardHeaderRow}>
            <Building2 size={18} color={Colors.primary} />
            <Text style={styles.cardTitle}>Bank Details</Text>
          </View>

          <Text style={styles.fieldLabel}>Bank Name</Text>
          <TextInput
            style={styles.input}
            value={bankName}
            onChangeText={setBankName}
            placeholder="e.g. GTBank, Access, Opay"
            placeholderTextColor={Colors.textMuted}
          />

          <Text style={styles.fieldLabel}>Account Name</Text>
          <TextInput
            style={styles.input}
            value={accountName}
            onChangeText={setAccountName}
            placeholder="Full name on account"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="words"
          />

          <Text style={[styles.fieldLabel, { marginTop: 4 }]}>Account Number</Text>
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="10-digit account number"
            placeholderTextColor={Colors.textMuted}
            keyboardType="numeric"
            maxLength={10}
          />
        </GlassCard>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            ℹ️ Payouts are processed within 24–48 hours. Ensure bank details are correct to avoid delays.
          </Text>
        </View>

        <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
          <LinearGradient
            colors={['#00f0ff', '#00d4d4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtn}
          >
            <Send size={18} color="#041c20" />
            <Text style={styles.submitBtnText}>{loading ? 'Submitting...' : 'Submit Payout Request'}</Text>
          </LinearGradient>
        </TouchableOpacity>

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

  summaryCard: { marginBottom: 20 },
  summaryGradient: { borderRadius: Radius.lg, padding: 24, overflow: 'hidden' },
  summaryShimmer: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(94,234,212,0.4)' },
  summaryLabel: { fontSize: Typography.sm, color: Colors.textSecondary, marginBottom: 4 },
  summaryBalance: { fontSize: 32, fontWeight: '900', color: Colors.textPrimary, letterSpacing: -0.5, marginBottom: 4 },
  summaryAccount: { fontSize: Typography.xs, color: Colors.textMuted },

  card: { padding: 20, marginBottom: 16 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  cardTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },

  fieldLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 8, fontWeight: Typography.medium },
  amountWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)', borderRadius: Radius.md, paddingHorizontal: 16, marginBottom: 12 },
  currencySymbol: { fontSize: 22, color: Colors.primary, fontWeight: '700', marginRight: 8 },
  amountInput: { flex: 1, fontSize: 24, fontWeight: '700', color: Colors.textPrimary, paddingVertical: 14 },
  quickAmounts: { flexDirection: 'row', gap: 8 },
  quickChip: { flex: 1, paddingVertical: 8, backgroundColor: 'rgba(13,148,136,0.15)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)', borderRadius: Radius.sm, alignItems: 'center' },
  quickChipText: { fontSize: Typography.xs, color: Colors.primary, fontWeight: Typography.semibold },

  input: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.18)', borderRadius: Radius.md, paddingHorizontal: 16, paddingVertical: 14, color: Colors.textPrimary, fontSize: Typography.base, marginBottom: 16 },

  noteBox: { backgroundColor: 'rgba(13,148,136,0.08)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.15)', borderRadius: Radius.md, padding: 14, marginBottom: 20 },
  noteText: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20 },

  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    paddingVertical: 16, borderRadius: 50,
    shadowColor: '#00f0ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12,
  },
  submitBtnText: { color: '#041c20', fontSize: 16, fontWeight: '700' },

  successWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  successGlow: { position: 'absolute', top: 0, width: 300, height: 300, borderRadius: 150 },
  successIcon: { marginBottom: 24, borderRadius: 50, overflow: 'hidden', shadowColor: '#5eead4', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 30, elevation: 10 },
  successIconInner: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12, textAlign: 'center' },
  successSub: { fontSize: Typography.base, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successBtn: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 50, shadowColor: '#00f0ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12 },
  successBtnText: { color: '#041c20', fontSize: 16, fontWeight: '700' },
  backLink: { color: Colors.primary, fontSize: Typography.base, textAlign: 'center' },
});
