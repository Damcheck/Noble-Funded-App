import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bell, DollarSign, TrendingUp, Users, AlertTriangle, Mail, Smartphone } from 'lucide-react-native';

interface NotifSetting {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState<NotifSetting[]>([
    {
      id: 'payout_approved',
      icon: <DollarSign size={18} color={Colors.primary} />,
      title: 'Payout Approved',
      description: 'Get notified when your payout request is approved and sent.',
      enabled: true,
    },
    {
      id: 'account_status',
      icon: <TrendingUp size={18} color={Colors.primary} />,
      title: 'Account Status Updates',
      description: 'Know when your account passes a phase, gets funded, or fails.',
      enabled: true,
    },
    {
      id: 'drawdown_warning',
      icon: <AlertTriangle size={18} color="#fbbf24" />,
      title: 'Drawdown Warnings',
      description: 'Alert when your daily or overall drawdown approaches the limit.',
      enabled: true,
    },
    {
      id: 'affiliate',
      icon: <Users size={18} color={Colors.primary} />,
      title: 'Affiliate Commissions',
      description: 'Notify when a referral converts and you earn commission.',
      enabled: false,
    },
    {
      id: 'promo',
      icon: <Bell size={18} color={Colors.primary} />,
      title: 'Promotions & Offers',
      description: 'Receive Noble Funded news, discounts, and special offers.',
      enabled: false,
    },
  ]);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    Alert.alert('Saved', 'Your notification preferences have been updated.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Delivery Methods */}
        <GlassCard style={styles.card} variant="surface">
          <Text style={styles.sectionLabel}>DELIVERY CHANNELS</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchLeft}>
              <Smartphone size={18} color={Colors.primary} />
              <View style={styles.switchInfo}>
                <Text style={styles.switchTitle}>Push Notifications</Text>
                <Text style={styles.switchSub}>Alerts sent directly to your phone</Text>
              </View>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: 'rgba(255,255,255,0.1)', true: 'rgba(20,184,166,0.5)' }}
              thumbColor={pushEnabled ? Colors.primary : Colors.textMuted}
            />
          </View>

          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View style={styles.switchLeft}>
              <Mail size={18} color={Colors.primary} />
              <View style={styles.switchInfo}>
                <Text style={styles.switchTitle}>Email Notifications</Text>
                <Text style={styles.switchSub}>Summaries sent to your email address</Text>
              </View>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: 'rgba(255,255,255,0.1)', true: 'rgba(20,184,166,0.5)' }}
              thumbColor={emailEnabled ? Colors.primary : Colors.textMuted}
            />
          </View>
        </GlassCard>

        {/* Notification Types */}
        <GlassCard style={styles.card} variant="surface">
          <Text style={styles.sectionLabel}>NOTIFICATION TYPES</Text>

          {settings.map((setting, i) => (
            <View
              key={setting.id}
              style={[
                styles.notifRow,
                i < settings.length - 1 && styles.notifRowBorder,
              ]}
            >
              <View style={styles.notifIcon}>{setting.icon}</View>
              <View style={styles.notifInfo}>
                <Text style={styles.notifTitle}>{setting.title}</Text>
                <Text style={styles.notifSub}>{setting.description}</Text>
              </View>
              <Switch
                value={setting.enabled}
                onValueChange={() => toggle(setting.id)}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: 'rgba(20,184,166,0.5)' }}
                thumbColor={setting.enabled ? Colors.primary : Colors.textMuted}
              />
            </View>
          ))}
        </GlassCard>

        <TouchableOpacity onPress={handleSave} activeOpacity={0.85}>
          <LinearGradient
            colors={['#00f0ff', '#00d4d4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtn}
          >
            <Text style={styles.saveBtnText}>Save Preferences</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 8 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  saveText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.bold },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1.2, marginBottom: 16 },

  card: { padding: 20, marginBottom: 16 },

  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.08)' },
  switchLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  switchInfo: { flex: 1 },
  switchTitle: { fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.semibold },
  switchSub: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },

  notifRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  notifRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.08)' },
  notifIcon: { width: 32, alignItems: 'center' },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: Typography.sm, color: Colors.textPrimary, fontWeight: Typography.semibold, marginBottom: 2 },
  notifSub: { fontSize: Typography.xs, color: Colors.textMuted, lineHeight: 16 },

  saveBtn: {
    paddingVertical: 16, borderRadius: 50, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#00f0ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12,
  },
  saveBtnText: { color: '#041c20', fontSize: 16, fontWeight: '700' },
});
