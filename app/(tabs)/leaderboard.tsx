import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/constants/data';

export default function LeaderboardScreen() {
  const { leaderboard, user } = useAppStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.goldGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard 🏆</Text>
          <Text style={styles.subtitle}>Top traders this month</Text>
        </View>

        {/* Podium — Top 3 */}
        <View style={styles.podium}>
          {/* 2nd place */}
          <View style={[styles.podiumItem, { marginTop: 24 }]}>
            <View style={[styles.avatar, styles.silver]}>
              <Text style={styles.avatarText}>{leaderboard[1]?.name?.[0]}</Text>
            </View>
            <View style={[styles.podiumBar, { height: 70, backgroundColor: '#94a3b8' }]}>
              <Text style={styles.podiumRank}>2</Text>
            </View>
            <Text style={styles.podiumName}>{leaderboard[1]?.name}</Text>
            <Text style={[styles.podiumProfit, { color: Colors.profit }]}>+{leaderboard[1]?.profit}%</Text>
          </View>

          {/* 1st place */}
          <View style={styles.podiumItem}>
            <View style={styles.crownWrap}>
              <Text style={styles.crown}>👑</Text>
            </View>
            <View style={[styles.avatar, styles.gold]}>
              <Text style={styles.avatarText}>{leaderboard[0]?.name?.[0]}</Text>
            </View>
            <View style={[styles.podiumBar, { height: 100, backgroundColor: '#fbbf24' }]}>
              <Text style={[styles.podiumRank, { color: Colors.darkBg }]}>1</Text>
            </View>
            <Text style={styles.podiumName}>{leaderboard[0]?.name}</Text>
            <Text style={[styles.podiumProfit, { color: Colors.warning }]}>+{leaderboard[0]?.profit}%</Text>
          </View>

          {/* 3rd place */}
          <View style={[styles.podiumItem, { marginTop: 36 }]}>
            <View style={[styles.avatar, styles.bronze]}>
              <Text style={styles.avatarText}>{leaderboard[2]?.name?.[0]}</Text>
            </View>
            <View style={[styles.podiumBar, { height: 56, backgroundColor: '#92400e' }]}>
              <Text style={styles.podiumRank}>3</Text>
            </View>
            <Text style={styles.podiumName}>{leaderboard[2]?.name}</Text>
            <Text style={[styles.podiumProfit, { color: Colors.profit }]}>+{leaderboard[2]?.profit}%</Text>
          </View>
        </View>

        {/* Full Table */}
        <GlassCard noPadding style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.thRank}>#</Text>
            <Text style={[styles.th, { flex: 2 }]}>Trader</Text>
            <Text style={styles.th}>Account</Text>
            <Text style={styles.th}>Profit</Text>
          </View>

          {leaderboard.map((entry, i) => (
            <View
              key={entry.rank}
              style={[
                styles.tableRow,
                i % 2 === 0 && styles.tableRowAlt,
                i === leaderboard.length - 1 && styles.tableRowLast,
              ]}
            >
              <View style={styles.rankCell}>
                {entry.badge === 'top' ? (
                  <Text style={styles.rankTop}>🥇</Text>
                ) : entry.badge === 'rising' ? (
                  <Text style={styles.rankRising}>↑</Text>
                ) : (
                  <Text style={styles.rankText}>{entry.rank}</Text>
                )}
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.traderName}>{entry.name}</Text>
                <View style={styles.countryRow}>
                  <Text style={styles.country}>{entry.country}</Text>
                  {entry.badge && (
                    <Badge
                      label={entry.badge}
                      variant={entry.badge}
                      size="sm"
                      style={{ marginLeft: 6 }}
                    />
                  )}
                </View>
              </View>
              <Text style={styles.td}>
                {formatCurrency(entry.accountSize, entry.currency)}
              </Text>
              <Text style={[styles.td, { color: Colors.profit, fontWeight: Typography.bold }]}>
                +{entry.profit}%
              </Text>
            </View>
          ))}
        </GlassCard>

        {/* My Rank Indicator */}
        <GlassCard variant="surface" style={styles.myRankCard}>
          <View style={styles.myRankRow}>
            <Text style={styles.myRankLabel}>Your Current Rank</Text>
            <Text style={styles.myRankValue}>— Not ranked yet</Text>
          </View>
          <Text style={styles.myRankSub}>
            Trade with a funded account to appear on the leaderboard.
          </Text>
        </GlassCard>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  goldGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(251,191,36,0.07)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { paddingTop: 16, paddingBottom: 20 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 4 },
  podium: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 16, marginBottom: 28, paddingBottom: 12 },
  podiumItem: { alignItems: 'center', width: 95 },
  crownWrap: { marginBottom: 4 },
  crown: { fontSize: 24, textAlign: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  gold: { backgroundColor: 'rgba(251,191,36,0.25)', borderWidth: 2, borderColor: '#fbbf24' },
  silver: { backgroundColor: 'rgba(148,163,184,0.25)', borderWidth: 2, borderColor: '#94a3b8' },
  bronze: { backgroundColor: 'rgba(146,64,14,0.25)', borderWidth: 2, borderColor: '#92400e' },
  avatarText: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  podiumBar: { width: 72, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  podiumRank: { fontSize: Typography.xl, fontWeight: Typography.black, color: Colors.textPrimary },
  podiumName: { fontSize: Typography.xs, color: Colors.textSecondary, fontWeight: Typography.semibold, marginTop: 6, textAlign: 'center' },
  podiumProfit: { fontSize: Typography.sm, fontWeight: Typography.bold, marginTop: 2 },
  tableCard: { marginBottom: 16 },
  tableHeader: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.10)' },
  thRank: { width: 36, fontSize: Typography.xs, color: Colors.textMuted, fontWeight: Typography.semibold },
  th: { flex: 1, fontSize: Typography.xs, color: Colors.textMuted, fontWeight: Typography.semibold },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  tableRowAlt: { backgroundColor: 'rgba(20,184,166,0.03)' },
  tableRowLast: { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  rankCell: { width: 36 },
  rankTop: { fontSize: Typography.base },
  rankRising: { fontSize: Typography.sm, color: Colors.profit, fontWeight: Typography.bold },
  rankText: { fontSize: Typography.sm, color: Colors.textMuted, fontWeight: Typography.semibold },
  traderName: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  countryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  country: { fontSize: Typography.xs, color: Colors.textMuted },
  td: { flex: 1, fontSize: Typography.xs, color: Colors.textSecondary, textAlign: 'right' },
  myRankCard: { marginBottom: 8 },
  myRankRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  myRankLabel: { fontSize: Typography.sm, color: Colors.textSecondary },
  myRankValue: { fontSize: Typography.sm, color: Colors.textMuted, fontWeight: Typography.semibold },
  myRankSub: { fontSize: Typography.xs, color: Colors.textMuted },
});
