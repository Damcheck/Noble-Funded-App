import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { formatCurrency } from '@/constants/data';

export default function PayoutsScreen() {
  const { payouts, accounts } = useAppStore();
  const [requesting, setRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNum, setAccountNum] = useState('');
  const [loading, setLoading] = useState(false);

  const fundedAccount = accounts.find((a) => a.status === 'funded');

  const handleRequest = async () => {
    if (!amount || !bankName || !accountNum) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setShowForm(false);
    setAmount('');
    setBankName('');
    setAccountNum('');
    Alert.alert('Success! 🎉', 'Your payout request has been submitted. Expect payment within 24 hours.');
  };

  const totalPaid = payouts.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.ambientGlow} />

      {/* Header */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Payouts</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryRow}>
          <GlassCard style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: Colors.profit }]}>
              {formatCurrency(totalPaid, 'NGN')}
            </Text>
            <Text style={styles.summaryLabel}>Total Paid Out</Text>
          </GlassCard>
          <GlassCard style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {payouts.filter((p) => p.status === 'paid').length}
            </Text>
            <Text style={styles.summaryLabel}>Successful</Text>
          </GlassCard>
        </View>

        {/* Request payout CTA */}
        {fundedAccount && !showForm && (
          <GlassCard style={styles.ctaCard}>
            <LinearGradient
              colors={['rgba(13,148,136,0.2)', 'rgba(6,15,14,0.2)']}
              style={styles.ctaInner}
            >
              <View>
                <Text style={styles.ctaTitle}>Request a Payout</Text>
                <Text style={styles.ctaSub}>
                  Available from {fundedAccount.accountNumber}
                </Text>
              </View>
              <Button
                label="Request"
                onPress={() => setShowForm(true)}
                size="sm"
                style={{ marginTop: 0 }}
              />
            </LinearGradient>
          </GlassCard>
        )}

        {/* Payout Form */}
        {showForm && (
          <GlassCard style={styles.formCard}>
            <Text style={styles.formTitle}>Payout Request</Text>
            <InputField
              label="Amount (NGN)"
              placeholder="e.g. 150000"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <InputField
              label="Bank Name"
              placeholder="e.g. GTBank"
              value={bankName}
              onChangeText={setBankName}
              autoCapitalize="words"
            />
            <InputField
              label="Account Number"
              placeholder="10-digit account number"
              value={accountNum}
              onChangeText={setAccountNum}
              keyboardType="numeric"
            />

            <View style={styles.formBtns}>
              <Button
                label="Cancel"
                onPress={() => setShowForm(false)}
                variant="ghost"
                size="md"
                style={{ flex: 1 }}
              />
              <Button
                label="Submit"
                onPress={handleRequest}
                loading={loading}
                size="md"
                style={{ flex: 1 }}
              />
            </View>
          </GlassCard>
        )}

        {/* Payout History */}
        <Text style={styles.sectionTitle}>Payout History</Text>
        {payouts.map((p, i) => (
          <GlassCard
            key={p.id}
            style={styles.payoutCard}
            variant={p.status === 'rejected' ? 'danger' : 'default'}
          >
            <View style={styles.payoutTop}>
              <View>
                <Text style={styles.payoutRef}>{p.reference ?? 'Pending ref...'}</Text>
                <Text style={styles.payoutMethod}>{p.method}</Text>
              </View>
              <Badge label={p.status} variant={p.status as any} />
            </View>

            <View style={styles.payoutBottom}>
              <Text style={[styles.payoutAmount, { color: p.status === 'paid' ? Colors.profit : Colors.textPrimary }]}>
                {formatCurrency(p.amount, p.currency)}
              </Text>
              <View>
                <Text style={styles.payoutDate}>
                  Requested: {new Date(p.requestedAt).toLocaleDateString('en-NG')}
                </Text>
                {p.paidAt && (
                  <Text style={[styles.payoutDate, { color: Colors.profit }]}>
                    Paid: {new Date(p.paidAt).toLocaleDateString('en-NG')}
                  </Text>
                )}
              </View>
            </View>
          </GlassCard>
        ))}

        {/* Info box */}
        <GlassCard variant="surface" style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Payout Policy</Text>
          <Text style={styles.infoText}>
            • Payouts are processed within 24 hours of approval{'\n'}
            • Minimum payout for Naira accounts: ₦10,000{'\n'}
            • Bank transfer to any Nigerian bank account{'\n'}
            • 80% profit split — you keep the majority
          </Text>
        </GlassCard>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.08)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  summaryCard: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: Typography.lg, fontWeight: Typography.black, color: Colors.textPrimary, marginBottom: 4 },
  summaryLabel: { fontSize: Typography.xs, color: Colors.textMuted },
  ctaCard: { marginBottom: 16 },
  ctaInner: { borderRadius: Radius.lg, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ctaTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  ctaSub: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  formCard: { marginBottom: 20 },
  formTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 16 },
  formBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 12 },
  payoutCard: { marginBottom: 12 },
  payoutTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  payoutRef: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  payoutMethod: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  payoutBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  payoutAmount: { fontSize: Typography.xl, fontWeight: Typography.black, letterSpacing: -0.3 },
  payoutDate: { fontSize: Typography.xs, color: Colors.textMuted, textAlign: 'right' },
  infoCard: { marginTop: 4 },
  infoTitle: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 10 },
  infoText: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 22 },
});
