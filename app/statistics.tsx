import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockAccounts, formatCurrency, generateEquityCurve, weeklyProfitData, instrumentBreakdown } from '@/constants/data';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

type PeriodTab = '7d' | '30d' | '60d';

export default function StatisticsScreen() {
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [period, setPeriod] = useState<PeriodTab>('30d');

  const allTrades = mockAccounts.flatMap((a) => a.trades);
  const trades = selectedAccount === 'all'
    ? allTrades
    : mockAccounts.find(a => a.id === selectedAccount)?.trades || [];

  const winTrades = trades.filter((t) => t.profit > 0);
  const lossTrades = trades.filter((t) => t.profit <= 0);
  const winRate = trades.length > 0 ? ((winTrades.length / trades.length) * 100).toFixed(1) : "0";
  const totalPnL = trades.reduce((s, t) => s + t.profit, 0);
  const avgWin = winTrades.length > 0 ? winTrades.reduce((s, t) => s + t.profit, 0) / winTrades.length : 0;
  const avgLoss = lossTrades.length > 0 ? Math.abs(lossTrades.reduce((s, t) => s + t.profit, 0) / lossTrades.length) : 1;
  const profitFactor = (avgLoss !== 0 ? avgWin / avgLoss : 0).toFixed(2);

  // Line Chart Data
  const equityCurve = generateEquityCurve(period === '7d' ? 7 : period === '30d' ? 30 : 60, 100000);
  const lineData = equityCurve.map(item => ({ value: item.value, label: item.label }));

  // Pie Chart Data
  const pieData = [
    { value: winTrades.length, color: Colors.profit, text: `${winTrades.length}` },
    { value: lossTrades.length, color: Colors.loss, text: `${lossTrades.length}` },
  ];

  // Bar Chart Data
  const barData = weeklyProfitData.map(d => ({
    value: d.profit,
    frontColor: Colors.profit,
    label: d.day,
  }));

  const activeAccounts = mockAccounts.filter(a => a.status !== 'failed');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Statistics</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header & Filters */}
        <View style={styles.header}>
          <Text style={styles.title}>Trading Performance</Text>
          <Text style={styles.subtitle}>Analyze your trades in depth.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
          <TouchableOpacity
            onPress={() => setSelectedAccount('all')}
            style={[styles.filterBtn, selectedAccount === 'all' && styles.filterBtnActive]}
          >
            <Text style={[styles.filterText, selectedAccount === 'all' && styles.filterTextActive]}>All Accounts</Text>
          </TouchableOpacity>
          {activeAccounts.map(a => (
            <TouchableOpacity
              key={a.id}
              onPress={() => setSelectedAccount(a.id)}
              style={[styles.filterBtn, selectedAccount === a.id && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, selectedAccount === a.id && styles.filterTextActive]}>
                {a.accountNumber.split('-').slice(0, 3).join('-')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Win Rate', value: `${winRate}%`, color: Colors.profit },
            { label: 'Total P&L', value: formatCurrency(Math.abs(totalPnL), 'NGN'), color: totalPnL >= 0 ? Colors.profit : Colors.loss },
            { label: 'Profit Factor', value: profitFactor, color: '#a7ffeb' },
            { label: 'Total Trades', value: `${trades.length}`, color: '#ffd166' },
          ].map((s, i) => (
            <GlassCard key={i} style={styles.statCard} variant="surface">
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Equity Curve Chart */}
        <GlassCard style={styles.chartCard} variant="surface">
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Equity Curve</Text>
            <View style={styles.periodToggle}>
              {(['7d', '30d', '60d'] as PeriodTab[]).map(p => (
                <TouchableOpacity key={p} onPress={() => setPeriod(p)}>
                  <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <LineChart
              data={lineData}
              width={width - 80}
              height={180}
              color="#a7ffeb"
              thickness={2}
              startFillColor="rgba(167,255,235,0.3)"
              endFillColor="rgba(167,255,235,0.01)"
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={0}
              noOfSections={4}
              yAxisTextStyle={{ color: '#7ab8ac', fontSize: 10 }}
              xAxisLabelTextStyle={{ color: '#7ab8ac', fontSize: 10 }}
              rulesColor="rgba(167,255,235,0.06)"
              rulesType="solid"
              yAxisColor="transparent"
              xAxisColor="rgba(167,255,235,0.2)"
              dataPointsColor="#a7ffeb"
              hideDataPoints
              areaChart
              curved
            />
          </View>
        </GlassCard>

        <View style={styles.row}>
          {/* Win/Loss Donut */}
          <GlassCard style={[styles.chartCard, { flex: 1, marginRight: 8 }]} variant="surface">
            <Text style={styles.chartTitle}>Win / Loss</Text>
            <View style={styles.pieWrapper}>
              <PieChart
                data={pieData}
                donut
                innerRadius={30}
                radius={50}
                innerCircleColor="transparent"
              />
              <View style={styles.pieLegend}>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: Colors.profit }]} /><Text style={styles.legendText}>Wins</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: Colors.loss }]} /><Text style={styles.legendText}>Loss</Text></View>
              </View>
            </View>
          </GlassCard>

          {/* Monthly P&L Bar */}
          <GlassCard style={[styles.chartCard, { flex: 1, marginLeft: 8 }]} variant="surface">
            <Text style={styles.chartTitle}>Daily P&L</Text>
            <View style={styles.barWrapper}>
              <BarChart
                data={barData}
                width={80}
                height={100}
                barWidth={8}
                spacing={12}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: 'transparent' }}
                xAxisLabelTextStyle={{ color: '#7ab8ac', fontSize: 8 }}
                noOfSections={3}
                maxValue={5}
                showLine={false}
              />
            </View>
          </GlassCard>
        </View>

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
  header: { marginBottom: 20 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary },
  
  filterScroll: { marginBottom: 20 },
  filterContent: { gap: 8 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.md, backgroundColor: 'rgba(13,148,136,0.1)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  filterBtnActive: { backgroundColor: 'rgba(94,234,212,0.2)', borderColor: Colors.primary },
  filterText: { fontSize: Typography.xs, fontWeight: Typography.semibold, color: Colors.textSecondary },
  filterTextActive: { color: Colors.primary },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  statCard: { width: (width - 52) / 2, padding: 16 },
  statValue: { fontSize: Typography.xl, fontWeight: Typography.black, marginBottom: 4 },
  statLabel: { fontSize: Typography.xs, color: Colors.textMuted },

  chartCard: { padding: 16, marginBottom: 20 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  chartTitle: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  periodToggle: { flexDirection: 'row', gap: 12 },
  periodText: { fontSize: Typography.xs, color: Colors.textMuted, fontWeight: Typography.medium },
  periodTextActive: { color: Colors.primary, fontWeight: Typography.bold },
  chartWrapper: { alignItems: 'center', justifyContent: 'center' },
  
  row: { flexDirection: 'row' },
  pieWrapper: { alignItems: 'center', marginTop: 12 },
  pieLegend: { flexDirection: 'row', gap: 12, marginTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: Typography.xs, color: Colors.textSecondary },
  
  barWrapper: { alignItems: 'center', marginTop: 12, marginLeft: -20 },
});
