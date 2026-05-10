import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { nairaChallengePricing, dollarChallengePricing, ChallengePricing } from '@/constants/data';

const { width } = Dimensions.get('window');

type CurrencyTab = 'NGN' | 'USD';
type PaymentGateway = 'paystack' | 'flutterwave' | 'korapay';

const CHALLENGE_RULES = [
  { icon: '🎯', label: 'Profit Target', naira: '10% Phase 1 · 10% Phase 2', usd: '10% Phase 1 · 5% Phase 2' },
  { icon: '📉', label: 'Max Daily Loss', naira: 'None', usd: '3%' },
  { icon: '🛡️', label: 'Max Overall Loss', naira: '20%', usd: '10%' },
  { icon: '📅', label: 'Min Trading Days', naira: '1 Day', usd: '3 Days' },
  { icon: '💰', label: 'Profit Split', naira: 'Up to 80%', usd: 'Up to 90%' },
  { icon: '⚡', label: 'Payout Speed', naira: '24 hours', usd: 'Bi-Weekly' },
  { icon: '🤖', label: 'EAs Allowed', naira: 'No', usd: 'No' },
];

export default function CheckoutScreen() {
  const [currency, setCurrency] = useState<CurrencyTab>('NGN');
  const [selected, setSelected] = useState<ChallengePricing | null>(null);
  const [gateway, setGateway] = useState<PaymentGateway>('paystack');
  const [loading, setLoading] = useState(false);

  const plans = currency === 'NGN' ? nairaChallengePricing : dollarChallengePricing;

  const handlePay = async () => {
    if (!selected) {
      Alert.alert('Select a Plan', 'Please choose an account size first.');
      return;
    }
    setLoading(true);

    // TODO: Replace with real Paystack/Flutterwave/KoraPay SDK integration
    // For now, open the web checkout as a fallback
    const size = selected.accountSize;
    const cur = currency.toLowerCase();
    const checkoutUrl = `https://checkout.noblefunded.com?currency=${cur}&size=${size}`;

    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    Alert.alert(
      'Proceed to Payment',
      `You will be redirected to complete your payment of ${
        currency === 'NGN' ? '₦' : '$'
      }${selected.challengeFee.toLocaleString()} for a ${selected.label} account.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Pay with ${gateway.charAt(0).toUpperCase() + gateway.slice(1)}`,
          onPress: () => Linking.openURL(checkoutUrl),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.ambientGlow} />

      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Get Funded</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Start Your Challenge</Text>
          <Text style={styles.heroSubtitle}>
            Choose your account size and begin your funded trading journey.
          </Text>
        </View>

        {/* Currency Toggle */}
        <View style={styles.currencyToggle}>
          {(['NGN', 'USD'] as CurrencyTab[]).map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => { setCurrency(c); setSelected(null); }}
              style={[styles.currencyBtn, currency === c && styles.currencyBtnActive]}
              activeOpacity={0.75}
            >
              {currency === c && (
                <LinearGradient
                  colors={['#0d9488', '#5eead4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              )}
              <Text style={[styles.currencyText, currency === c && styles.currencyTextActive]}>
                {c === 'NGN' ? '₦ Naira' : '$ Dollar'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pricing plans */}
        <Text style={styles.sectionLabel}>Select Account Size</Text>
        <View style={styles.plansGrid}>
          {plans.map((plan) => {
            const isSelected = selected?.accountSize === plan.accountSize;
            return (
              <TouchableOpacity
                key={plan.accountSize}
                onPress={() => setSelected(plan)}
                activeOpacity={0.82}
                style={styles.planWrap}
              >
                <View
                  style={[
                    styles.planCard,
                    isSelected && styles.planCardSelected,
                  ]}
                >
                  <BlurView intensity={16} tint="dark" style={StyleSheet.absoluteFill} />
                  <View style={[styles.planOverlay, isSelected && styles.planOverlaySelected]} />
                  {isSelected && <View style={styles.planShimmer} />}

                  <View style={styles.planContent}>
                    {isSelected && (
                      <View style={styles.selectedDot}>
                        <Text style={styles.selectedDotText}>✓</Text>
                      </View>
                    )}
                    <Text style={styles.planSize}>{plan.label}</Text>
                    <Text style={styles.planFee}>
                      {currency === 'NGN' ? '₦' : '$'}
                      {plan.challengeFee.toLocaleString()}
                    </Text>
                    <Text style={styles.planFeeLabel}>Challenge Fee</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Challenge rules */}
        <Text style={styles.sectionLabel}>Challenge Rules</Text>
        <GlassCard noPadding style={styles.rulesCard}>
          <View style={styles.rulesHeader}>
            <Text style={styles.rulesCol}>Rule</Text>
            <Text style={styles.rulesColVal}>
              {currency === 'NGN' ? '₦ Naira' : '$ Dollar'}
            </Text>
          </View>
          {CHALLENGE_RULES.map((rule, i) => (
            <View
              key={rule.label}
              style={[
                styles.ruleRow,
                i < CHALLENGE_RULES.length - 1 && styles.ruleRowBorder,
              ]}
            >
              <Text style={styles.ruleIcon}>{rule.icon}</Text>
              <Text style={styles.ruleLabel}>{rule.label}</Text>
              <Text style={styles.ruleValue}>
                {currency === 'NGN' ? rule.naira : rule.usd}
              </Text>
            </View>
          ))}
        </GlassCard>

        {/* Payment Gateway Selection */}
        <Text style={styles.sectionLabel}>Payment Method</Text>
        <View style={styles.gatewayRow}>
          {([
            { id: 'paystack', label: 'Paystack', emoji: '💳' },
            { id: 'flutterwave', label: 'Flutterwave', emoji: '🦋' },
            { id: 'korapay', label: 'KoraPay', emoji: '🌀' },
          ] as { id: PaymentGateway; label: string; emoji: string }[]).map((gw) => (
            <TouchableOpacity
              key={gw.id}
              onPress={() => setGateway(gw.id)}
              style={[styles.gwCard, gateway === gw.id && styles.gwCardActive]}
              activeOpacity={0.75}
            >
              <Text style={styles.gwEmoji}>{gw.emoji}</Text>
              <Text style={[styles.gwLabel, gateway === gw.id && { color: Colors.primary }]}>
                {gw.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        {selected && (
          <GlassCard style={styles.summaryCard} variant="surface">
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryKey}>Account Size</Text>
              <Text style={styles.summaryVal}>{selected.label}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryKey}>Challenge Fee</Text>
              <Text style={[styles.summaryVal, { color: Colors.warning }]}>
                {currency === 'NGN' ? '₦' : '$'}{selected.challengeFee.toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryKey}>Profit Split</Text>
              <Text style={[styles.summaryVal, { color: Colors.profit }]}>80%</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryKey}>Currency</Text>
              <Badge label={currency} variant={currency === 'NGN' ? 'naira' : 'dollar'} />
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalKey}>Total Due Today</Text>
              <Text style={styles.summaryTotalVal}>
                {currency === 'NGN' ? '₦' : '$'}{selected.challengeFee.toLocaleString()}
              </Text>
            </View>
          </GlassCard>
        )}

        <Button
          label={selected ? `Pay ${currency === 'NGN' ? '₦' : '$'}${selected.challengeFee.toLocaleString()} with ${gateway.charAt(0).toUpperCase() + gateway.slice(1)}` : 'Select a Plan to Continue'}
          onPress={handlePay}
          loading={loading}
          disabled={!selected}
          fullWidth
          size="lg"
          style={{ marginTop: 8, marginBottom: 8 }}
        />

        <Text style={styles.legal}>
          By proceeding, you agree to Noble Funded's Terms & Conditions and Trading Rules. Challenge fees are non-refundable.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.10)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  scroll: { paddingHorizontal: 20, paddingBottom: 60 },
  hero: { paddingTop: 8, paddingBottom: 24 },
  heroTitle: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.textPrimary, letterSpacing: -0.3, marginBottom: 8 },
  heroSubtitle: { fontSize: Typography.base, color: Colors.textSecondary, lineHeight: 24 },
  currencyToggle: { flexDirection: 'row', marginBottom: 24, backgroundColor: 'rgba(10,28,26,0.6)', borderRadius: Radius.lg, padding: 4, borderWidth: 1, borderColor: 'rgba(94,234,212,0.14)' },
  currencyBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: Radius.md, overflow: 'hidden' },
  currencyBtnActive: {},
  currencyText: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textSecondary },
  currencyTextActive: { color: Colors.darkBg, fontWeight: Typography.bold },
  sectionLabel: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 },
  plansGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  planWrap: { width: (width - 50) / 2 },
  planCard: { borderRadius: Radius.lg, borderWidth: 1, borderColor: 'rgba(94,234,212,0.14)', overflow: 'hidden', position: 'relative', minHeight: 110 },
  planCardSelected: { borderColor: Colors.primary, borderWidth: 2 },
  planOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,28,26,0.65)' },
  planOverlaySelected: { backgroundColor: 'rgba(13,148,136,0.18)' },
  planShimmer: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(94,234,212,0.5)' },
  planContent: { padding: 16, alignItems: 'center' },
  selectedDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  selectedDotText: { fontSize: 12, fontWeight: Typography.bold, color: Colors.darkBg },
  planSize: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 6 },
  planFee: { fontSize: Typography.lg, fontWeight: Typography.black, color: Colors.primary, letterSpacing: -0.3 },
  planFeeLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  rulesCard: { marginBottom: 24 },
  rulesHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.10)' },
  rulesCol: { fontSize: Typography.xs, color: Colors.textMuted, fontWeight: Typography.semibold, textTransform: 'uppercase' },
  rulesColVal: { fontSize: Typography.xs, color: Colors.primary, fontWeight: Typography.semibold, textTransform: 'uppercase' },
  ruleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  ruleRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.06)' },
  ruleIcon: { fontSize: 16, width: 24 },
  ruleLabel: { flex: 1, fontSize: Typography.sm, color: Colors.textSecondary },
  ruleValue: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  gatewayRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  gwCard: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: Radius.md, borderWidth: 1, borderColor: 'rgba(94,234,212,0.14)', backgroundColor: 'rgba(10,28,26,0.6)', gap: 6 },
  gwCardActive: { borderColor: Colors.primary, backgroundColor: 'rgba(94,234,212,0.10)' },
  gwEmoji: { fontSize: 24 },
  gwLabel: { fontSize: Typography.xs, color: Colors.textSecondary, fontWeight: Typography.semibold },
  summaryCard: { marginBottom: 20 },
  summaryTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(20,184,166,0.08)' },
  summaryKey: { fontSize: Typography.sm, color: Colors.textSecondary },
  summaryVal: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  summaryTotal: { borderBottomWidth: 0, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(94,234,212,0.12)', marginTop: 4 },
  summaryTotalKey: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  summaryTotalVal: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.primary },
  legal: { fontSize: Typography.xs, color: Colors.textMuted, textAlign: 'center', lineHeight: 18, paddingHorizontal: 16, marginTop: 12 },
});
