import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/constants/data';

export default function AffiliateScreen() {
  const { affiliate } = useAppStore();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🚀 Join Noble Funded — Nigeria's #1 Prop Trading Firm!\n\nUse my referral link to get started:\n${affiliate.referralLink}\n\nCode: ${affiliate.referralCode}`,
        url: affiliate.referralLink,
      });
    } catch {
      Alert.alert('Error', 'Could not share link.');
    }
  };

  const handleCopyCode = () => {
    Alert.alert('Copied!', `Code ${affiliate.referralCode} copied.`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.ambientGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Affiliate Center 🤝</Text>
          <Text style={styles.subtitle}>Earn 10% commission on every referral</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>{affiliate.totalReferrals}</Text>
            <Text style={styles.statLabel}>Total Referrals</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.warning }]}>{affiliate.pendingReferrals}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.profit }]}>
              {formatCurrency(affiliate.totalEarnings, affiliate.currency)}
            </Text>
            <Text style={styles.statLabel}>Earned</Text>
          </GlassCard>
        </View>

        {/* Referral Link Card */}
        <GlassCard style={styles.linkCard}>
          <Text style={styles.linkCardTitle}>Your Referral Link</Text>

          <View style={styles.codeRow}>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{affiliate.referralCode}</Text>
            </View>
            <TouchableOpacity onPress={handleCopyCode} style={styles.copyBtn}>
              <LinearGradient colors={['#0d9488', '#5eead4']} style={styles.copyBtnInner}>
                <Text style={styles.copyText}>Copy</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.linkBox}>
            <Text style={styles.linkText} numberOfLines={1}>
              {affiliate.referralLink}
            </Text>
          </View>

          <Button
            label="Share My Link"
            onPress={handleShare}
            fullWidth
            size="md"
            style={{ marginTop: 12 }}
          />
        </GlassCard>

        {/* How It Works */}
        <GlassCard variant="surface" style={styles.howCard}>
          <Text style={styles.howTitle}>How It Works</Text>
          {[
            { step: '1', text: 'Share your unique referral link with fellow traders' },
            { step: '2', text: 'They sign up and purchase a Noble Funded challenge' },
            { step: '3', text: 'You earn 10% of their challenge fee automatically' },
            { step: '4', text: 'Payouts every week directly to your account' },
          ].map((item) => (
            <View key={item.step} style={styles.howRow}>
              <View style={styles.howBadge}>
                <Text style={styles.howBadgeText}>{item.step}</Text>
              </View>
              <Text style={styles.howText}>{item.text}</Text>
            </View>
          ))}
        </GlassCard>

        {/* Referrals Table */}
        <Text style={styles.sectionTitle}>Recent Referrals</Text>
        <GlassCard noPadding>
          {affiliate.referrals.map((ref, i) => (
            <View
              key={ref.id}
              style={[
                styles.refRow,
                i < affiliate.referrals.length - 1 && styles.refRowBorder,
              ]}
            >
              <View style={styles.refAvatar}>
                <Text style={styles.refAvatarText}>{ref.name[0]}</Text>
              </View>
              <View style={styles.refInfo}>
                <Text style={styles.refName}>{ref.name}</Text>
                <Text style={styles.refEmail}>{ref.email}</Text>
              </View>
              <View style={styles.refRight}>
                {ref.commission > 0 ? (
                  <Text style={styles.refCommission}>
                    +{formatCurrency(ref.commission, ref.currency)}
                  </Text>
                ) : null}
                <Badge
                  label={ref.status}
                  variant={ref.status === 'active' ? 'active' : ref.status === 'converted' ? 'paid' : 'pending'}
                  size="sm"
                />
              </View>
            </View>
          ))}
        </GlassCard>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.08)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { paddingTop: 16, paddingBottom: 20 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: Typography.lg, fontWeight: Typography.black, color: Colors.primary, marginBottom: 4 },
  statLabel: { fontSize: Typography.xs, color: Colors.textMuted, textAlign: 'center' },
  linkCard: { marginBottom: 16 },
  linkCardTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 14 },
  codeRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  codeBox: { flex: 1, backgroundColor: 'rgba(94,234,212,0.08)', borderRadius: Radius.md, borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)', paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'center' },
  codeText: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.primary, letterSpacing: 1 },
  copyBtn: { borderRadius: Radius.md, overflow: 'hidden' },
  copyBtnInner: { paddingHorizontal: 18, paddingVertical: 12 },
  copyText: { color: Colors.darkBg, fontWeight: Typography.bold, fontSize: Typography.sm },
  linkBox: { backgroundColor: 'rgba(13,148,136,0.07)', borderRadius: Radius.sm, borderWidth: 1, borderColor: 'rgba(94,234,212,0.12)', paddingHorizontal: 12, paddingVertical: 10 },
  linkText: { fontSize: Typography.xs, color: Colors.textSecondary },
  howCard: { marginBottom: 20 },
  howTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 14 },
  howRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  howBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(94,234,212,0.15)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.3)', alignItems: 'center', justifyContent: 'center' },
  howBadgeText: { fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.primary },
  howText: { flex: 1, fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20 },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 12 },
  refRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  refRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(20,184,166,0.08)' },
  refAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(94,234,212,0.12)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)', alignItems: 'center', justifyContent: 'center' },
  refAvatarText: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.primary },
  refInfo: { flex: 1 },
  refName: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  refEmail: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  refRight: { alignItems: 'flex-end', gap: 4 },
  refCommission: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.profit },
});
