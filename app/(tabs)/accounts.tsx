import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge, statusToBadgeVariant, statusToLabel } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/constants/data';

const { width } = Dimensions.get('window');

export default function AccountsScreen() {
  const { accounts } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'naira' | 'dollar'>('all');

  const filtered = filter === 'all' ? accounts : accounts.filter((a) => a.type === filter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.ambientGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Trading Accounts</Text>
          <Text style={styles.subtitle}>{accounts.length} accounts total</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {(['all', 'naira', 'dollar'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterTab, filter === f && styles.filterActive]}
              activeOpacity={0.75}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f === 'naira' ? '₦ Naira' : '$ Dollar'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Cards */}
        {filtered.map((account) => (
          <TouchableOpacity
            key={account.id}
            onPress={() => router.push(`/account-detail?id=${account.id}`)}
            activeOpacity={0.82}
            style={styles.cardWrap}
          >
            <GlassCard
              variant={account.status === 'failed' ? 'danger' : 'default'}
              noPadding
            >
              {/* Top gradient header */}
              <LinearGradient
                colors={
                  account.status === 'failed'
                    ? ['rgba(239,68,68,0.12)', 'transparent']
                    : account.status === 'funded'
                    ? ['rgba(94,234,212,0.12)', 'transparent']
                    : ['rgba(251,191,36,0.08)', 'transparent']
                }
                style={styles.cardHeader}
              >
                <View style={styles.cardTopRow}>
                  <View>
                    <Text style={styles.accountNum}>{account.accountNumber}</Text>
                    <Text style={styles.accountSub}>
                      {account.platform} · {account.leverage} · {account.server}
                    </Text>
                  </View>
                  <View style={styles.badges}>
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

                <Text style={styles.balance}>
                  {formatCurrency(account.balance, account.currency)}
                </Text>
                <Text style={styles.startingBalance}>
                  Starting: {formatCurrency(account.startingBalance, account.currency)}
                </Text>
              </LinearGradient>

              {/* Stats */}
              <View style={styles.cardBody}>
                <View style={styles.statsGrid}>
                  <StatBox
                    label="Profit"
                    value={`${account.currentProfit > 0 ? '+' : ''}${account.currentProfit.toFixed(2)}%`}
                    target={`Target: ${account.profitTarget}%`}
                    positive={account.currentProfit >= 0}
                  />
                  <StatBox
                    label="Daily DD"
                    value={`${account.currentDailyDrawdown.toFixed(2)}%`}
                    target={`Max: ${account.maxDailyDrawdown === 0 ? 'None' : account.maxDailyDrawdown + '%'}`}
                    positive={true}
                  />
                  <StatBox
                    label="Overall DD"
                    value={`${account.currentOverallDrawdown.toFixed(2)}%`}
                    target={`Max: ${account.maxOverallDrawdown}%`}
                    positive={account.currentOverallDrawdown < account.maxOverallDrawdown * 0.7}
                  />
                </View>

                <ProgressBar
                  value={account.currentProfit < 0 ? 0 : account.currentProfit}
                  max={account.profitTarget}
                  label="Profit Target"
                  showValue
                  variant={account.currentProfit < 0 ? 'danger' : 'default'}
                  style={{ marginTop: 12, marginBottom: 8 }}
                />

                <TouchableOpacity
                  style={styles.detailBtn}
                  onPress={() => router.push(`/account-detail?id=${account.id}`)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.detailBtnText}>View Details & Trades →</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}

        {/* Buy new account CTA */}
        <TouchableOpacity onPress={() => router.push('/checkout')} activeOpacity={0.82}>
          <GlassCard style={styles.buyCard} variant="surface">
            <LinearGradient
              colors={['rgba(13,148,136,0.2)', 'rgba(6,15,14,0.2)']}
              style={styles.buyInner}
            >
              <Text style={styles.buyIcon}>➕</Text>
              <View>
                <Text style={styles.buyTitle}>Get a New Account</Text>
                <Text style={styles.buySub}>Start a new challenge from ₦10,000</Text>
              </View>
            </LinearGradient>
          </GlassCard>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, target, positive }: { label: string; value: string; target: string; positive: boolean }) {
  return (
    <View style={statStyles.box}>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={[statStyles.value, { color: positive ? Colors.profit : Colors.loss }]}>{value}</Text>
      <Text style={statStyles.target}>{target}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  label: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 4 },
  value: { fontSize: Typography.base, fontWeight: Typography.bold, marginBottom: 2 },
  target: { fontSize: 10, color: Colors.textMuted },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.08)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { paddingTop: 16, paddingBottom: 20 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 4 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  filterTab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1, borderColor: 'rgba(94,234,212,0.15)', backgroundColor: 'rgba(10,28,26,0.6)' },
  filterActive: { backgroundColor: 'rgba(94,234,212,0.15)', borderColor: 'rgba(94,234,212,0.4)' },
  filterText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: Typography.medium },
  filterTextActive: { color: Colors.primary, fontWeight: Typography.semibold },
  cardWrap: { marginBottom: 16 },
  cardHeader: { padding: 20, paddingBottom: 16 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  accountNum: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  accountSub: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  badges: { flexDirection: 'row' },
  balance: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.textPrimary, letterSpacing: -0.3 },
  startingBalance: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  cardBody: { paddingHorizontal: 20, paddingBottom: 16 },
  statsGrid: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(94,234,212,0.08)', marginTop: 4 },
  detailBtn: { paddingVertical: 10, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(94,234,212,0.08)', marginTop: 8 },
  detailBtnText: { color: Colors.primary, fontSize: Typography.sm, fontWeight: Typography.semibold },
  buyCard: { marginTop: 4 },
  buyInner: { borderRadius: Radius.lg, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 },
  buyIcon: { fontSize: 32 },
  buyTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  buySub: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
});
