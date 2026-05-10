import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge, statusToBadgeVariant, statusToLabel } from '@/components/ui/Badge';
import { ProgressBar, StatRow } from '@/components/ui/ProgressBar';
import { formatCurrency, generateEquityCurve } from '@/constants/data';

export default function AccountDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { accounts } = useAppStore();
  const account = accounts.find((a) => a.id === id) ?? accounts[0];
  const [tab, setTab] = useState<'overview' | 'trades'>('overview');
  const [showPwd, setShowPwd] = useState(false);

  if (!account) return null;

  const equityCurve = generateEquityCurve(30, account.startingBalance);
  const recentTrades = account.trades.slice(0, 10);
  const winTrades = account.trades.filter((t) => t.profit > 0);
  const winRate = ((winTrades.length / account.trades.length) * 100).toFixed(1);
  const totalPnL = account.trades.reduce((sum, t) => sum + t.profit, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.ambientGlow} />

      {/* Header Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>{account.accountNumber}</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <GlassCard
          noPadding
          variant={account.status === 'failed' ? 'danger' : 'default'}
          style={styles.heroCard}
        >
          <LinearGradient
            colors={
              account.status === 'failed'
                ? ['rgba(239,68,68,0.15)', 'rgba(6,15,14,0.3)']
                : ['rgba(13,148,136,0.20)', 'rgba(6,15,14,0.3)']
            }
            style={styles.heroGradient}
          >
            <View style={styles.heroShimmer} />
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>Current Balance</Text>
                <Text style={styles.heroBalance}>
                  {formatCurrency(account.balance, account.currency)}
                </Text>
              </View>
              <View style={{ gap: 6 }}>
                <Badge
                  label={account.currency}
                  variant={account.currency === 'NGN' ? 'naira' : 'dollar'}
                  size="md"
                />
                <Badge
                  label={statusToLabel(account.status)}
                  variant={statusToBadgeVariant(account.status)}
                  size="md"
                />
              </View>
            </View>

            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Starting</Text>
                <Text style={styles.heroStatValue}>
                  {formatCurrency(account.startingBalance, account.currency)}
                </Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>P&L</Text>
                <Text style={[styles.heroStatValue, { color: totalPnL >= 0 ? Colors.profit : Colors.loss }]}>
                  {totalPnL >= 0 ? '+' : ''}{formatCurrency(Math.abs(totalPnL), account.currency)}
                </Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatLabel}>Win Rate</Text>
                <Text style={[styles.heroStatValue, { color: Colors.primary }]}>{winRate}%</Text>
              </View>
            </View>
          </LinearGradient>
        </GlassCard>

        {/* Progress bars */}
        <GlassCard style={styles.progressCard}>
          <Text style={styles.cardTitle}>Challenge Progress</Text>
          <ProgressBar
            value={account.currentProfit < 0 ? 0 : account.currentProfit}
            max={account.profitTarget}
            label="Profit Target"
            showValue
            variant={account.currentProfit < 0 ? 'danger' : 'default'}
            style={{ marginBottom: 14 }}
          />
          <ProgressBar
            value={account.currentOverallDrawdown}
            max={account.maxOverallDrawdown}
            label="Overall Drawdown Used"
            showValue
            variant={account.currentOverallDrawdown > account.maxOverallDrawdown * 0.7 ? 'danger' : 'warning'}
          />
        </GlassCard>

        {/* Objectives Checklist */}
        {(account.status === 'challenge_phase1' || account.status === 'challenge_phase2') && (
          <GlassCard style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Trading Objectives</Text>
            <View style={styles.objectiveRow}>
              <View style={[styles.objCheck, account.currentProfit >= account.profitTarget && styles.objCheckPassed]}>
                <Text style={styles.objCheckText}>{account.currentProfit >= account.profitTarget ? '✓' : ''}</Text>
              </View>
              <Text style={styles.objText}>Reach Profit Target ({account.profitTarget}%)</Text>
            </View>
            <View style={styles.objectiveRow}>
              <View style={[styles.objCheck, account.currentOverallDrawdown < account.maxOverallDrawdown && styles.objCheckPassed]}>
                <Text style={styles.objCheckText}>{account.currentOverallDrawdown < account.maxOverallDrawdown ? '✓' : ''}</Text>
              </View>
              <Text style={styles.objText}>Max Drawdown Not Exceeded ({account.maxOverallDrawdown}%)</Text>
            </View>
            {account.maxDailyDrawdown > 0 && (
              <View style={styles.objectiveRow}>
                <View style={[styles.objCheck, account.currentDailyDrawdown < account.maxDailyDrawdown && styles.objCheckPassed]}>
                  <Text style={styles.objCheckText}>{account.currentDailyDrawdown < account.maxDailyDrawdown ? '✓' : ''}</Text>
                </View>
                <Text style={styles.objText}>Daily Drawdown Not Exceeded ({account.maxDailyDrawdown}%)</Text>
              </View>
            )}
          </GlassCard>
        )}

        {/* Credentials Details */}
        <GlassCard style={styles.detailsCard}>
          <View style={styles.credHeader}>
            <Text style={styles.cardTitle}>Platform Credentials</Text>
            <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
              <Text style={styles.showPwdText}>{showPwd ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.credRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.credLabel}>Login</Text>
              <Text style={styles.credValue}>{account.login}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn}><Text style={styles.copyIcon}>📋</Text></TouchableOpacity>
          </View>

          <View style={styles.credRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.credLabel}>Password</Text>
              <Text style={styles.credValue}>{showPwd ? account.password : '••••••••'}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn}><Text style={styles.copyIcon}>📋</Text></TouchableOpacity>
          </View>

          <View style={[styles.credRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.credLabel}>Server</Text>
              <Text style={styles.credValue}>{account.server}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.credLabel}>Platform</Text>
              <Text style={styles.credValue}>{account.platform}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          {(['overview', 'trades'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'overview' ? '📊 Stats' : '📋 Trade History'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'overview' ? (
          <GlassCard style={styles.statsCard}>
            <StatRow label="Total Trades" value={`${account.trades.length}`} />
            <StatRow label="Winning Trades" value={`${winTrades.length}`} valueColor={Colors.profit} />
            <StatRow label="Losing Trades" value={`${account.trades.length - winTrades.length}`} valueColor={Colors.loss} />
            <StatRow label="Win Rate" value={`${winRate}%`} valueColor={Colors.primary} />
            <StatRow label="Total P&L" value={formatCurrency(Math.abs(totalPnL), account.currency)} valueColor={totalPnL >= 0 ? Colors.profit : Colors.loss} />
            <StatRow label="Profit Split" value={`${account.profitSplit}%`} />
          </GlassCard>
        ) : (
          <GlassCard noPadding style={styles.tradesCard}>
            {/* Table header */}
            <View style={styles.tradeHeader}>
              <Text style={[styles.tradeTh, { flex: 1.2 }]}>Symbol</Text>
              <Text style={styles.tradeTh}>Type</Text>
              <Text style={styles.tradeTh}>Lots</Text>
              <Text style={[styles.tradeTh, { textAlign: 'right' }]}>P&L</Text>
            </View>
            {recentTrades.map((trade, i) => (
              <View
                key={trade.id}
                style={[
                  styles.tradeRow,
                  i % 2 === 0 && styles.tradeRowAlt,
                ]}
              >
                <Text style={[styles.tradeTd, { flex: 1.2, fontWeight: Typography.semibold, color: Colors.textPrimary }]}>
                  {trade.symbol}
                </Text>
                <View style={{ flex: 1 }}>
                  <Badge
                    label={trade.type.toUpperCase()}
                    variant={trade.type === 'buy' ? 'active' : 'failed'}
                    size="sm"
                  />
                </View>
                <Text style={styles.tradeTd}>{trade.lots}</Text>
                <Text
                  style={[
                    styles.tradeTd,
                    { textAlign: 'right', color: trade.profit >= 0 ? Colors.profit : Colors.loss, fontWeight: Typography.bold },
                  ]}
                >
                  {trade.profit >= 0 ? '+' : ''}{formatCurrency(Math.abs(trade.profit), trade.currency)}
                </Text>
              </View>
            ))}
          </GlassCard>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.08)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  backBtn: { width: 60 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  heroCard: { marginBottom: 16 },
  heroGradient: { borderRadius: Radius.lg, padding: 24, overflow: 'hidden' },
  heroShimmer: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(94,234,212,0.4)' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  heroLabel: { fontSize: Typography.sm, color: Colors.textSecondary, marginBottom: 4 },
  heroBalance: { fontSize: Typography['2xl'], fontWeight: Typography.black, color: Colors.textPrimary, letterSpacing: -0.3 },
  heroStats: { flexDirection: 'row' },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 4 },
  heroStatValue: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  heroDivider: { width: 1, backgroundColor: 'rgba(94,234,212,0.15)' },
  progressCard: { marginBottom: 12 },
  detailsCard: { marginBottom: 12 },
  cardTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 14 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: Radius.md, borderWidth: 1, borderColor: 'rgba(94,234,212,0.15)', alignItems: 'center' },
  tabBtnActive: { backgroundColor: 'rgba(94,234,212,0.12)', borderColor: 'rgba(94,234,212,0.4)' },
  tabText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: Typography.medium },
  tabTextActive: { color: Colors.primary, fontWeight: Typography.semibold },
  statsCard: { marginBottom: 12 },
  tradesCard: { marginBottom: 12 },
  tradeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.10)' },
  tradeTh: { flex: 1, fontSize: 10, color: Colors.textMuted, fontWeight: Typography.semibold, textTransform: 'uppercase', letterSpacing: 0.5 },
  tradeRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10 },
  tradeRowAlt: { backgroundColor: 'rgba(20,184,166,0.03)' },
  tradeTd: { flex: 1, fontSize: Typography.xs, color: Colors.textSecondary },
  
  objectiveRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  objCheck: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(94,234,212,0.3)', backgroundColor: 'rgba(13,148,136,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  objCheckPassed: { backgroundColor: Colors.profit, borderColor: Colors.profit },
  objCheckText: { fontSize: 10, color: Colors.darkBg, fontWeight: Typography.black },
  objText: { fontSize: Typography.sm, color: Colors.textSecondary },

  credHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  showPwdText: { fontSize: Typography.xs, color: Colors.primary, fontWeight: Typography.bold },
  credRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.08)' },
  credLabel: { fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  credValue: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  copyBtn: { padding: 8, backgroundColor: 'rgba(13,148,136,0.1)', borderRadius: Radius.sm },
  copyIcon: { fontSize: 14 },
});
