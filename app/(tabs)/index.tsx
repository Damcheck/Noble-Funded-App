import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge, statusToBadgeVariant, statusToLabel } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/constants/data';
import { PieChart, Banknote, Award, ShoppingCart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function OverviewScreen() {
  const { user, accounts, payouts } = useAppStore();
  const activeAccount = accounts.find((a) => a.status === 'funded') ?? accounts[0];
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const pendingPayouts = payouts.filter((p) => p.status === 'processing' || p.status === 'pending');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      {/* Top ambient glow */}
      <View style={styles.ambientGlow} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}, {user?.name?.split(' ')[0] ?? 'Trader'} 👋
            </Text>
            <Text style={styles.subGreeting}>Your trading dashboard</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/checkout')} style={styles.getBtn}>
            <LinearGradient
              colors={['#0d9488', '#5eead4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.getBtnInner}
            >
              <Text style={styles.getBtnText}>+ Get Funded</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Hero Balance Card */}
        <GlassCard style={styles.heroCard} noPadding>
          <LinearGradient
            colors={['rgba(13,148,136,0.25)', 'rgba(6,15,14,0.3)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroShimmer} />
            <Text style={styles.heroLabel}>Total Portfolio Value</Text>
            <Text style={styles.heroBalance}>
              {formatCurrency(totalBalance, 'NGN')}
            </Text>
            <View style={styles.heroRow}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Accounts</Text>
                <Text style={styles.heroStatValue}>{accounts.length}</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Paid Out</Text>
                <Text style={[styles.heroStatValue, { color: Colors.profit }]}>
                  {formatCurrency(user?.totalPayouts ?? 0, 'NGN')}
                </Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Profit</Text>
                <Text style={[styles.heroStatValue, { color: Colors.primary }]}>
                  +{activeAccount?.currentProfit?.toFixed(1)}%
                </Text>
              </View>
            </View>
          </LinearGradient>
        </GlassCard>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActions}>
          {[
            { icon: <PieChart size={24} color={Colors.primary} />, label: 'Accounts', route: '/(tabs)/accounts' },
            { icon: <Banknote size={24} color={Colors.primary} />, label: 'Payouts', route: '/payouts' },
            { icon: <Award size={24} color={Colors.primary} />, label: 'Rankings', route: '/(tabs)/leaderboard' },
            { icon: <ShoppingCart size={24} color={Colors.primary} />, label: 'Buy Plan', route: '/checkout' },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => router.push(item.route as any)}
              style={styles.quickCard}
              activeOpacity={0.75}
            >
              <GlassCard noPadding style={styles.quickCardInner}>
                <View style={styles.quickCardContent}>
                  <View style={{ marginBottom: 4 }}>{item.icon}</View>
                  <Text style={styles.quickLabel}>{item.label}</Text>
                </View>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active Accounts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Accounts</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/accounts')}>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        {accounts.slice(0, 3).map((account) => (
          <TouchableOpacity
            key={account.id}
            onPress={() => router.push(`/account-detail?id=${account.id}`)}
            activeOpacity={0.82}
          >
            <GlassCard
              style={styles.accountCard}
              variant={account.status === 'failed' ? 'danger' : 'default'}
            >
              <View style={styles.accountTop}>
                <View>
                  <Text style={styles.accountNum}>{account.accountNumber}</Text>
                  <Text style={styles.accountPlatform}>{account.platform} · {account.leverage}</Text>
                </View>
                <View style={styles.accountBadges}>
                  <Badge
                    label={account.currency}
                    variant={account.currency === 'NGN' ? 'naira' : 'dollar'}
                  />
                  <Badge
                    label={statusToLabel(account.status)}
                    variant={statusToBadgeVariant(account.status)}
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </View>

              <View style={styles.accountBalance}>
                <Text style={styles.accountBalanceLabel}>Balance</Text>
                <Text style={styles.accountBalanceValue}>
                  {formatCurrency(account.balance, account.currency)}
                </Text>
              </View>

              <ProgressBar
                value={account.currentProfit < 0 ? 0 : account.currentProfit}
                max={account.profitTarget}
                label="Profit Target Progress"
                showValue
                variant={account.currentProfit < 0 ? 'danger' : 'default'}
                style={{ marginTop: 12 }}
              />
            </GlassCard>
          </TouchableOpacity>
        ))}

        {/* Pending payouts */}
        {pendingPayouts.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pending Payouts</Text>
            </View>
            {pendingPayouts.map((p) => (
              <GlassCard key={p.id} style={styles.payoutCard} variant="surface">
                <View style={styles.payoutRow}>
                  <View>
                    <Text style={styles.payoutRef}>{p.reference}</Text>
                    <Text style={styles.payoutMethod}>{p.method}</Text>
                  </View>
                  <View style={styles.payoutRight}>
                    <Text style={styles.payoutAmount}>
                      {formatCurrency(p.amount, p.currency)}
                    </Text>
                    <Badge label={p.status} variant={p.status as any} size="sm" />
                  </View>
                </View>
              </GlassCard>
            ))}
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: 'rgba(13,148,136,0.10)',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  subGreeting: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
  getBtn: { borderRadius: Radius.md, overflow: 'hidden' },
  getBtnInner: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: Radius.md },
  getBtnText: { color: Colors.darkBg, fontSize: Typography.sm, fontWeight: Typography.bold },
  heroCard: { marginBottom: 24 },
  heroGradient: { borderRadius: Radius.lg, padding: 24, overflow: 'hidden' },
  heroShimmer: {
    position: 'absolute',
    top: 0, left: '10%', right: '10%',
    height: 1,
    backgroundColor: 'rgba(94,234,212,0.4)',
  },
  heroLabel: { fontSize: Typography.sm, color: Colors.textSecondary, marginBottom: 6 },
  heroBalance: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.textPrimary,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 4 },
  heroStatValue: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  heroDivider: { width: 1, height: 32, backgroundColor: 'rgba(94,234,212,0.15)' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  seeAll: { fontSize: Typography.sm, color: Colors.primary },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  quickCard: { flex: 1 },
  quickCardInner: { borderRadius: Radius.md },
  quickCardContent: { padding: 14, alignItems: 'center', gap: 6 },
  quickLabel: { fontSize: Typography.xs, color: Colors.textSecondary, fontWeight: Typography.semibold, textAlign: 'center' },
  accountCard: { marginBottom: 12 },
  accountTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  accountNum: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  accountPlatform: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  accountBadges: { flexDirection: 'row' },
  accountBalance: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accountBalanceLabel: { fontSize: Typography.sm, color: Colors.textSecondary },
  accountBalanceValue: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  payoutCard: { marginBottom: 10 },
  payoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  payoutRef: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  payoutMethod: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  payoutRight: { alignItems: 'flex-end', gap: 6 },
  payoutAmount: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.profit },
});
