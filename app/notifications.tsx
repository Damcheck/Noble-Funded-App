import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { CheckCircle, AlertTriangle, XCircle, Info, BellOff } from 'lucide-react-native';

type NotifType = 'success' | 'warning' | 'info' | 'danger';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotifType;
  read: boolean;
}

const MOCK_NOTIFS: Notification[] = [
  { id: '1', title: 'Payout Approved', message: 'Your payout of ₦680,000 has been approved and processed to your GTBank account.', time: '2 hours ago', type: 'success', read: false },
  { id: '2', title: 'Phase 1 Passed!', message: 'Congratulations! You have successfully passed Phase 1 of the ₦400,000 Challenge. Your Phase 2 credentials have been emailed.', time: '1 day ago', type: 'success', read: false },
  { id: '3', title: 'Drawdown Warning', message: 'Your account NF-USD-10K has reached 8% overall drawdown. The maximum allowed is 10%.', time: '2 days ago', type: 'warning', read: true },
  { id: '4', title: 'Welcome to Noble Funded', message: 'We are excited to have you on board. Start your first challenge today to become a funded trader.', time: '1 week ago', type: 'info', read: true },
];

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifs.filter(n => filter === 'all' ? true : !n.read);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: NotifType) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} color={getColor(type)} />;
      case 'warning': return <AlertTriangle size={20} color={getColor(type)} />;
      case 'danger': return <XCircle size={20} color={getColor(type)} />;
      case 'info': return <Info size={20} color={getColor(type)} />;
    }
  };

  const getColor = (type: NotifType) => {
    switch (type) {
      case 'success': return Colors.profit;
      case 'warning': return Colors.warning;
      case 'danger': return Colors.danger;
      case 'info': return Colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markReadText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Tabs */}
        <View style={styles.tabsRow}>
          {(['all', 'unread'] as const).map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.tabBtn, filter === f && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, filter === f && styles.tabTextActive]}>
                {f === 'all' ? 'All Alerts' : 'Unread'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <BellOff size={48} color={Colors.textMuted} style={{ marginBottom: 12 }} />
            <Text style={styles.emptyTitle}>You're all caught up!</Text>
            <Text style={styles.emptySubtitle}>No new notifications right now.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filtered.map(n => (
              <TouchableOpacity
                key={n.id}
                style={[styles.notifCard, !n.read && styles.notifCardUnread]}
                onPress={() => {
                  setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x));
                }}
              >
                {!n.read && <View style={styles.unreadDot} />}
                
                <View style={[styles.iconWrap, { backgroundColor: `${getColor(n.type)}20` }]}>
                  {getIcon(n.type)}
                </View>

                <View style={styles.content}>
                  <View style={styles.headerRow}>
                    <Text style={[styles.title, !n.read && { color: Colors.textPrimary }]}>{n.title}</Text>
                    <Text style={styles.time}>{n.time}</Text>
                  </View>
                  <Text style={styles.message} numberOfLines={3}>{n.message}</Text>
                </View>
              </TouchableOpacity>
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
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium, width: 80 },
  navTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  markReadText: { fontSize: Typography.xs, color: Colors.textMuted, width: 80, textAlign: 'right' },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },
  
  tabsRow: { flexDirection: 'row', backgroundColor: 'rgba(13,148,136,0.1)', padding: 4, borderRadius: Radius.lg, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  tabBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: Radius.md },
  tabBtnActive: { backgroundColor: 'rgba(20,184,166,0.15)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.25)' },
  tabText: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary },
  tabTextActive: { color: Colors.primary },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 4 },
  emptySubtitle: { fontSize: Typography.sm, color: Colors.textMuted },

  list: { gap: 12 },
  notifCard: { flexDirection: 'row', padding: 16, backgroundColor: 'rgba(13,148,136,0.03)', borderRadius: Radius.lg, borderWidth: 1, borderColor: 'rgba(94,234,212,0.05)', position: 'relative' },
  notifCardUnread: { backgroundColor: 'rgba(13,148,136,0.1)', borderColor: 'rgba(94,234,212,0.2)' },
  unreadDot: { position: 'absolute', top: 16, right: 16, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  
  content: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, paddingRight: 16 },
  title: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.textSecondary },
  time: { fontSize: 10, color: Colors.textMuted },
  message: { fontSize: Typography.xs, color: Colors.textSecondary, lineHeight: 18 },
});
