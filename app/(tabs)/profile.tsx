import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UserCheck, BarChart2, Award, CreditCard, FileText, HelpCircle, ClipboardList, ShieldCheck, Bell, Activity, ChevronRight, Edit3, Building2, Send } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAppStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/onboarding');
        },
      },
    ]);
  };

  const menuItems = [
    { icon: <Edit3 size={20} color={Colors.primary} />, label: 'Edit Profile', route: '/edit-profile' },
    { icon: <UserCheck size={20} color={Colors.primary} />, label: 'Identity Verification (KYC)', route: '/kyc' },
    { icon: <BarChart2 size={20} color={Colors.primary} />, label: 'Trading Statistics', route: '/statistics' },
    { icon: <Award size={20} color={Colors.primary} />, label: 'Certificates', route: '/certificates' },
    { icon: <Send size={20} color={Colors.primary} />, label: 'Request Payout', route: '/request-payout' },
    { icon: <CreditCard size={20} color={Colors.primary} />, label: 'Payout History', route: '/payouts' },
    { icon: <Building2 size={20} color={Colors.primary} />, label: 'Bank Details', route: '/bank-details' },
    { icon: <FileText size={20} color={Colors.primary} />, label: 'Trading Rules', route: '/rules' },
    { icon: <HelpCircle size={20} color={Colors.primary} />, label: 'FAQ & Support', route: '/support' },
    { icon: <ClipboardList size={20} color={Colors.primary} />, label: 'Terms & Conditions', route: '/terms' },
    { icon: <ShieldCheck size={20} color={Colors.primary} />, label: 'Security & Password', route: '/security' },
    { icon: <Bell size={20} color={Colors.primary} />, label: 'Notification Settings', route: '/notification-settings' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      <View style={styles.ambientGlow} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile hero */}
        <GlassCard noPadding style={styles.heroCard}>
          <LinearGradient
            colors={['rgba(13,148,136,0.25)', 'rgba(6,15,14,0.2)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroShimmer} />
            <View style={styles.avatarWrap}>
              <LinearGradient colors={['#0d9488', '#5eead4']} style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name?.[0] ?? 'T'}
                </Text>
              </LinearGradient>
              <View style={styles.kycBadge}>
                <Badge
                  label={user?.kycStatus === 'verified' ? '✓ KYC Verified' : 'KYC Pending'}
                  variant={user?.kycStatus === 'verified' ? 'verified' : 'pending'}
                />
              </View>
            </View>
            <Text style={styles.name}>{user?.name ?? 'Trader'}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Country</Text>
                <Text style={styles.metaValue}>{user?.country}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Member Since</Text>
                <Text style={styles.metaValue}>
                  {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }) : '—'}
                </Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Phone</Text>
                <Text style={styles.metaValue}>{user?.phone?.slice(0, 8)}**</Text>
              </View>
            </View>
          </LinearGradient>
        </GlassCard>

        {/* Menu */}
        <GlassCard noPadding style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => router.push(item.route as any)}
              style={[
                styles.menuRow,
                i < menuItems.length - 1 && styles.menuRowBorder,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <ChevronRight size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </GlassCard>

        {/* Noble Terminal quick link */}
        <GlassCard variant="surface" style={styles.terminalCard}>
          <View style={styles.terminalRow}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Activity size={16} color={Colors.primary} />
                <Text style={styles.terminalTitle}>Noble Terminal</Text>
              </View>
              <Text style={styles.terminalSub}>Live market intelligence for traders</Text>
            </View>
            <TouchableOpacity style={styles.terminalBtn}>
              <LinearGradient colors={['#0d9488', '#5eead4']} style={styles.terminalBtnInner}>
                <Text style={styles.terminalBtnText}>Open</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Logout */}
        <Button
          label="Sign Out"
          onPress={handleLogout}
          variant="danger"
          fullWidth
          size="md"
          style={{ marginTop: 8 }}
        />

        <Text style={styles.version}>Noble Funded v1.0.0 · Made in Nigeria 🇳🇬</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  ambientGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.08)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  heroCard: { marginBottom: 20 },
  heroGradient: { borderRadius: Radius.lg, padding: 24, alignItems: 'center', overflow: 'hidden' },
  heroShimmer: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(94,234,212,0.4)' },
  avatarWrap: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  avatarText: { fontSize: Typography['3xl'], fontWeight: Typography.black, color: Colors.darkBg },
  kycBadge: {},
  name: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 4 },
  email: { fontSize: Typography.sm, color: Colors.textSecondary, marginBottom: 20 },
  metaRow: { flexDirection: 'row', width: '100%' },
  metaItem: { flex: 1, alignItems: 'center' },
  metaLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 4 },
  metaValue: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary },
  metaDivider: { width: 1, backgroundColor: 'rgba(94,234,212,0.15)' },
  menuCard: { marginBottom: 16 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 15, gap: 14 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(20,184,166,0.08)' },
  menuIcon: { width: 28, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.medium },
  terminalCard: { marginBottom: 16 },
  terminalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  terminalTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  terminalSub: { fontSize: Typography.xs, color: Colors.textSecondary },
  terminalBtn: { borderRadius: Radius.md, overflow: 'hidden' },
  terminalBtnInner: { paddingHorizontal: 18, paddingVertical: 10 },
  terminalBtnText: { color: Colors.darkBg, fontWeight: Typography.bold, fontSize: Typography.sm },
  version: { textAlign: 'center', color: Colors.textMuted, fontSize: Typography.xs, marginTop: 20 },
});
