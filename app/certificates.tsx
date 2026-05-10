import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockAccounts, mockPayouts, formatCurrency } from '@/constants/data';

type CertTab = 'naira' | 'dollar';
type CertType = 'all' | 'payout' | 'pass';

interface Certificate {
  id: string;
  type: 'payout' | 'pass';
  title: string;
  accountNumber: string;
  accountType: 'naira' | 'dollar';
  currency: 'NGN' | 'USD';
  date: string;
  details: string;
  amount?: number;
  phase?: string;
}

const generateCertificates = (): Certificate[] => {
  const certs: Certificate[] = [];

  mockPayouts.filter(p => p.status === 'paid').forEach((p, i) => {
    const acc = mockAccounts.find(a => a.id === p.accountId);
    certs.push({
      id: `cert-pay-${i}`,
      type: 'payout',
      title: 'Payout Certificate',
      accountNumber: acc?.accountNumber || p.accountId,
      accountType: acc?.type || 'naira',
      currency: p.currency,
      date: p.paidAt || p.requestedAt,
      details: `Successfully received ${formatCurrency(p.amount, p.currency)} via ${p.method}`,
      amount: p.amount,
    });
  });

  mockAccounts.filter(a => a.status === 'funded' || a.status === 'passed').forEach((acc, i) => {
    certs.push({
      id: `cert-p1-${i}`,
      type: 'pass',
      title: 'Challenge Phase 1 Certificate',
      accountNumber: acc.accountNumber,
      accountType: acc.type,
      currency: acc.currency,
      date: acc.createdAt,
      details: `Successfully passed Phase 1 evaluation.`,
      phase: 'Phase 1',
    });
    if (acc.status === 'funded') {
      certs.push({
        id: `cert-p2-${i}`,
        type: 'pass',
        title: 'Funded Account Certificate',
        accountNumber: acc.accountNumber,
        accountType: acc.type,
        currency: acc.currency,
        date: acc.createdAt,
        details: `Successfully passed Phase 2 evaluation and received funded account.`,
        phase: 'Phase 2',
      });
    }
  });

  return certs;
};

const allCerts = generateCertificates();

export default function CertificatesScreen() {
  const [tab, setTab] = useState<CertTab>('naira');
  const [typeFilter, setTypeFilter] = useState<CertType>('all');

  const filtered = allCerts.filter(c => {
    return c.accountType === tab && (typeFilter === 'all' || c.type === typeFilter);
  });

  const handleDownload = () => {
    Alert.alert('Download Started', 'Your certificate PDF is being generated and will be saved to your device shortly.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Certificates</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Achievement Records</Text>
          <Text style={styles.subtitle}>View and download your official pass and payout certificates.</Text>
        </View>

        {/* Currency Tabs */}
        <View style={styles.tabsRow}>
          {(['naira', 'dollar'] as CertTab[]).map(t => {
            const count = allCerts.filter(c => c.accountType === t).length;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTab(t)}
                style={[styles.tabBtn, tab === t && (t === 'naira' ? styles.tabBtnNaira : styles.tabBtnDollar)]}
              >
                <Text style={[styles.tabText, tab === t && (t === 'naira' ? styles.tabTextNaira : styles.tabTextDollar)]}>
                  {t === 'naira' ? 'Naira ₦' : 'Dollar $'}
                </Text>
                <View style={[styles.badge, tab === t ? (t === 'naira' ? styles.badgeActiveNaira : styles.badgeActiveDollar) : styles.badgeInactive]}>
                  <Text style={[styles.badgeText, tab === t ? (t === 'naira' ? styles.badgeTextActiveNaira : styles.badgeTextActiveDollar) : styles.badgeTextInactive]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Type Filters */}
        <View style={styles.filterRow}>
          {(['all', 'pass', 'payout'] as CertType[]).map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setTypeFilter(f)}
              style={[styles.filterBtn, typeFilter === f && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, typeFilter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f === 'pass' ? 'Pass Certs' : 'Payouts'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Certificates List */}
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏆</Text>
            <Text style={styles.emptyTitle}>No certificates yet</Text>
            <Text style={styles.emptySubtitle}>Pass a challenge or request a payout to earn your first certificate.</Text>
          </View>
        ) : (
          <View style={styles.certList}>
            {filtered.map(cert => (
              <GlassCard key={cert.id} style={[styles.certCard, cert.accountType === 'naira' ? styles.certCardNaira : styles.certCardDollar]}>
                <View style={styles.certHeader}>
                  <View style={styles.certIconWrap}>
                    <Text style={styles.certIcon}>{cert.type === 'payout' ? '💵' : '🎖️'}</Text>
                  </View>
                  <View style={{ flex: 1, paddingLeft: 12 }}>
                    <Text style={styles.certTitle}>{cert.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center', gap: 6 }}>
                      <Badge label={cert.currency} variant={cert.accountType} />
                      {cert.phase && <Text style={styles.certPhase}>{cert.phase}</Text>}
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleDownload} style={styles.downloadBtn}>
                    <Text style={styles.downloadText}>↓ Save</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.certSealRow}>
                  <Text style={[styles.certSealText, { color: cert.accountType === 'naira' ? '#fbbf24' : '#5eead4' }]}>
                    NOBLE FUNDED — OFFICIAL CERTIFICATE
                  </Text>
                </View>

                <View style={styles.certDetailsBox}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ACCOUNT</Text>
                    <Text style={styles.detailVal}>{cert.accountNumber}</Text>
                  </View>
                  {cert.amount !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>AMOUNT</Text>
                      <Text style={[styles.detailVal, { color: Colors.profit }]}>{formatCurrency(cert.amount, cert.currency)}</Text>
                    </View>
                  )}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ISSUED</Text>
                    <Text style={styles.detailVal}>{new Date(cert.date).toLocaleDateString()}</Text>
                  </View>
                </View>

                <Text style={styles.certDesc}>{cert.details}</Text>

                <View style={styles.verifiedRow}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                  <Text style={styles.verifiedText}>Verified by Noble Funded</Text>
                </View>
              </GlassCard>
            ))}
          </View>
        )}
        
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

  tabsRow: { flexDirection: 'row', backgroundColor: 'rgba(13,148,136,0.1)', padding: 4, borderRadius: Radius.lg, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: Radius.md, gap: 6 },
  tabBtnNaira: { backgroundColor: 'rgba(251,191,36,0.15)', borderWidth: 1, borderColor: 'rgba(251,191,36,0.25)' },
  tabBtnDollar: { backgroundColor: 'rgba(20,184,166,0.15)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.25)' },
  tabText: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary },
  tabTextNaira: { color: '#fbbf24' },
  tabTextDollar: { color: '#5eead4' },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeActiveNaira: { backgroundColor: 'rgba(251,191,36,0.15)' },
  badgeActiveDollar: { backgroundColor: 'rgba(20,184,166,0.12)' },
  badgeInactive: { backgroundColor: 'rgba(255,255,255,0.1)' },
  badgeText: { fontSize: 10, fontWeight: Typography.bold },
  badgeTextActiveNaira: { color: '#fbbf24' },
  badgeTextActiveDollar: { color: '#5eead4' },
  badgeTextInactive: { color: Colors.textMuted },

  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.md, backgroundColor: 'rgba(13,148,136,0.1)' },
  filterBtnActive: { backgroundColor: 'rgba(167,255,235,0.15)' },
  filterText: { fontSize: Typography.xs, fontWeight: Typography.semibold, color: Colors.textSecondary },
  filterTextActive: { color: '#a7ffeb' },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, backgroundColor: 'rgba(13,148,136,0.05)', borderRadius: Radius.lg, borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 4 },
  emptySubtitle: { fontSize: Typography.sm, color: Colors.textMuted, textAlign: 'center', paddingHorizontal: 20 },

  certList: { gap: 16 },
  certCard: { padding: 16 },
  certCardNaira: { borderColor: 'rgba(251,191,36,0.25)' },
  certCardDollar: { borderColor: 'rgba(94,234,212,0.25)' },
  certHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  certIconWrap: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  certIcon: { fontSize: 20 },
  certTitle: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.textPrimary },
  certPhase: { fontSize: 10, color: Colors.textMuted, fontWeight: Typography.semibold },
  downloadBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.md },
  downloadText: { fontSize: Typography.xs, fontWeight: Typography.semibold, color: Colors.textPrimary },
  certSealRow: { alignItems: 'center', marginBottom: 12 },
  certSealText: { fontSize: 9, fontWeight: Typography.black, letterSpacing: 1.5 },
  certDetailsBox: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: Radius.md, gap: 8, marginBottom: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: Typography.bold, letterSpacing: 0.5 },
  detailVal: { fontSize: Typography.xs, color: Colors.textPrimary, fontWeight: Typography.semibold },
  certDesc: { fontSize: Typography.xs, color: Colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  verifiedIcon: { fontSize: 12, color: Colors.profit, fontWeight: Typography.black },
  verifiedText: { fontSize: 10, color: Colors.profit, fontWeight: Typography.semibold },
});
