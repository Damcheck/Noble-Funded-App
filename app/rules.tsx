import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggle} style={styles.accordionHeader} activeOpacity={0.7}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text style={[styles.accordionIcon, open && styles.accordionIconOpen]}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.accordionBody}>
          {children}
        </View>
      )}
    </View>
  );
}

function Bullet({ text, good }: { text: string, good?: boolean }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletIcon, { color: good ? Colors.profit : Colors.loss }]}>
        {good ? '✓' : '✗'}
      </Text>
      <Text style={[styles.bulletText, { color: good ? Colors.textPrimary : Colors.textSecondary }]}>{text}</Text>
    </View>
  );
}

function NairaRules() {
  return (
    <View style={styles.rulesContent}>
      <Accordion title="What is the Naira Challenge Account?" defaultOpen={true}>
        <Text style={styles.p}>
          The Noble Funded Naira Challenge is a 2-phase evaluation designed for Nigerian traders. You trade in Naira on a simulated MT5 account. Once you pass both phases, you receive a fully funded Naira live account where you keep a percentage of all profits.
        </Text>
        <View style={[styles.infoBox, { borderColor: 'rgba(251,191,36,0.2)' }]}>
          <Text style={styles.infoText}>Challenge fees are non-refundable. Account sizes range from ₦200,000 to ₦3,000,000.</Text>
        </View>
      </Accordion>

      <Accordion title="Profit Target">
        <Text style={styles.p}>
          <Text style={styles.strong}>Phase 1:</Text> 10% of your account size.{'\n'}
          <Text style={styles.strong}>Phase 2:</Text> 10% of your account size.
        </Text>
        <Text style={styles.pMuted}>Profit must be from closed trades. Floating/open profit does not count.</Text>
      </Accordion>

      <Accordion title="Maximum Drawdown">
        <Text style={styles.p}>
          Maximum drawdown on Naira accounts is <Text style={styles.strong}>20%</Text>. If your equity drops below this level, your account is terminated.
        </Text>
        <View style={[styles.infoBox, { borderColor: 'rgba(74,222,128,0.2)', backgroundColor: 'rgba(74,222,128,0.05)' }]}>
          <Text style={styles.infoText}>There is <Text style={styles.strong}>NO daily drawdown</Text> on Naira accounts. Only the overall 20% maximum drawdown applies.</Text>
        </View>
      </Accordion>

      <Accordion title="Minimum Trading Days & Time Limit">
        <Text style={styles.p}><Text style={styles.strong}>Minimum 1 trading day</Text> per phase.</Text>
        <Text style={styles.p}><Text style={styles.strong}>No time limit.</Text> Trade at your own pace. However, you must place at least one trade within 30 days or your account will be disabled.</Text>
      </Accordion>

      <Accordion title="Profit Split — The Two-Tier System">
        <Text style={styles.p}>
          On Naira accounts, you can make a maximum of <Text style={styles.strong}>200%</Text> of your account size in total profit. The profit split works like this:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• <Text style={styles.strong}>Tier 1</Text> — First 100% of profit = <Text style={{ color: Colors.profit }}>80/20</Text> (you keep 80%)</Text>
          <Text style={styles.listItem}>• <Text style={styles.strong}>Tier 2</Text> — Any profit above 100%, up to the 200% cap = <Text style={{ color: '#fbbf24' }}>60/40</Text> (you keep 60%)</Text>
        </View>
        <View style={[styles.infoBox, { borderColor: 'rgba(248,113,113,0.2)', backgroundColor: 'rgba(248,113,113,0.05)' }]}>
          <Text style={styles.infoText}>Anything above 200% is <Text style={styles.strong}>not counted at all</Text>. After reaching 200%, the account is complete and closes.</Text>
        </View>
      </Accordion>

      <Accordion title="What is Allowed / Not Allowed">
        <Text style={styles.subHeading}>Allowed</Text>
        <View style={{ marginBottom: 12 }}>
          <Bullet good text="Manual trading only" />
          <Bullet good text="Swing trading & Day trading" />
          <Bullet good text="Scalping (3+ minutes)" />
          <Bullet good text="Hedging (within the same account)" />
        </View>
        <Text style={styles.subHeading}>Not Allowed</Text>
        <View>
          <Bullet text="Scalping under 3 minutes" />
          <Bullet text="Expert Advisors (EAs) or trading bots" />
          <Bullet text="Copy trading & Weekend holding" />
          <Bullet text="News trading & Group trading" />
        </View>
      </Accordion>
    </View>
  );
}

function DollarRules() {
  return (
    <View style={styles.rulesContent}>
      <Accordion title="What is the Dollar Challenge Account?" defaultOpen={true}>
        <Text style={styles.p}>
          The Noble Funded Dollar Challenge is a 2-phase evaluation for traders who want to trade in USD. Once you pass both phases, you receive a fully funded Dollar live account where you keep up to 90% of all profits with no profit cap.
        </Text>
        <View style={[styles.infoBox, { borderColor: 'rgba(20,184,166,0.2)' }]}>
          <Text style={styles.infoText}>All Dollar challenge fees are non-refundable. Account sizes range from $5,000 to $200,000.</Text>
        </View>
      </Accordion>

      <Accordion title="Profit Target">
        <Text style={styles.p}>
          <Text style={styles.strong}>Phase 1:</Text> 10% of your account size.{'\n'}
          <Text style={styles.strong}>Phase 2:</Text> 5% of your account size.
        </Text>
        <Text style={styles.pMuted}>Profit must be from closed trades. Floating profit does not count.</Text>
      </Accordion>

      <Accordion title="Daily Drawdown & Max Drawdown">
        <Text style={styles.p}>
          <Text style={styles.strong}>Daily Drawdown:</Text> 3% of your account balance at the start of each trading day (00:00 server time).
        </Text>
        <Text style={styles.p}>
          <Text style={styles.strong}>Maximum Drawdown:</Text> 10% of your initial account balance. Static/fixed — does NOT trail.
        </Text>
      </Accordion>

      <Accordion title="Minimum Trading Days & Time Limit">
        <Text style={styles.p}><Text style={styles.strong}>Phase 1 & 2:</Text> Minimum 3 trading days.</Text>
        <Text style={styles.p}><Text style={styles.strong}>Funded Account:</Text> No minimum.</Text>
        <Text style={styles.p}><Text style={styles.strong}>No time limit.</Text> You must place at least one trade every 30 days to keep the account active.</Text>
      </Accordion>

      <Accordion title="Profit Split & Scaling Plan">
        <Text style={styles.p}><Text style={styles.strong}>Standard:</Text> 80% to you / 20% to Noble Funded</Text>
        <Text style={styles.p}><Text style={styles.strong}>After Scaling:</Text> Up to 90% to you / 10% to Noble Funded</Text>
        <Text style={styles.p}>There is <Text style={styles.strong}>no profit cap</Text> on Dollar accounts. Trade as long as you maintain the rules.</Text>
        <Text style={styles.p}><Text style={styles.strong}>Scaling:</Text> Grow your funded account every 4 months by 25% of the account size, up to a maximum of $200,000.</Text>
      </Accordion>

      <Accordion title="What is Allowed / Not Allowed">
        <Text style={styles.subHeading}>Allowed</Text>
        <View style={{ marginBottom: 12 }}>
          <Bullet good text="Manual trading only" />
          <Bullet good text="Scalping (normal, not tick scalping)" />
          <Bullet good text="Swing trading (close before weekend)" />
          <Bullet good text="All instruments" />
        </View>
        <Text style={styles.subHeading}>Not Allowed</Text>
        <View>
          <Bullet text="Expert Advisors (EAs) or trading bots" />
          <Bullet text="Copy trading & News trading" />
          <Bullet text="Weekend holding" />
          <Bullet text="Account sharing or third-party trading" />
        </View>
      </Accordion>
    </View>
  );
}

export default function RulesScreen() {
  const [tab, setTab] = useState<'naira' | 'dollar'>('naira');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Trading Rules</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Toggle */}
        <View style={styles.tabsRow}>
          {(['naira', 'dollar'] as ('naira' | 'dollar')[]).map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && (t === 'naira' ? styles.tabBtnNaira : styles.tabBtnDollar)]}
            >
              <Text style={[styles.tabText, tab === t && (t === 'naira' ? styles.tabTextNaira : styles.tabTextDollar)]}>
                {t === 'naira' ? 'Naira Rules ₦' : 'Dollar Rules $'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {tab === 'naira' ? <NairaRules /> : <DollarRules />}
        
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

  tabsRow: { flexDirection: 'row', backgroundColor: 'rgba(13,148,136,0.1)', padding: 4, borderRadius: Radius.lg, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  tabBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: Radius.md },
  tabBtnNaira: { backgroundColor: 'rgba(251,191,36,0.15)', borderWidth: 1, borderColor: 'rgba(251,191,36,0.25)' },
  tabBtnDollar: { backgroundColor: 'rgba(20,184,166,0.15)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.25)' },
  tabText: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary },
  tabTextNaira: { color: '#fbbf24' },
  tabTextDollar: { color: '#5eead4' },

  rulesContent: { gap: 12 },

  accordionContainer: { backgroundColor: 'rgba(13,148,136,0.07)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.12)', borderRadius: Radius.lg, overflow: 'hidden' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  accordionTitle: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary, flex: 1 },
  accordionIcon: { fontSize: 20, color: Colors.textMuted, fontWeight: '300' },
  accordionIconOpen: { color: Colors.primary },
  accordionBody: { paddingHorizontal: 16, paddingBottom: 16, borderTopWidth: 1, borderTopColor: 'rgba(94,234,212,0.08)', paddingTop: 12 },

  p: { fontSize: Typography.xs, color: Colors.textSecondary, lineHeight: 18, marginBottom: 8 },
  pMuted: { fontSize: Typography.xs, color: Colors.primary, lineHeight: 18, opacity: 0.8 },
  strong: { fontWeight: Typography.bold, color: Colors.textPrimary },
  infoBox: { padding: 12, borderRadius: Radius.sm, backgroundColor: 'rgba(13,148,136,0.05)', borderWidth: 1, marginTop: 8 },
  infoText: { fontSize: Typography.xs, color: Colors.textSecondary, lineHeight: 18 },
  
  list: { marginLeft: 8, marginTop: 4, marginBottom: 8 },
  listItem: { fontSize: Typography.xs, color: Colors.textSecondary, lineHeight: 18, marginBottom: 4 },

  subHeading: { fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  bulletIcon: { fontSize: 14, fontWeight: Typography.black, marginTop: -2 },
  bulletText: { fontSize: Typography.xs, flex: 1, lineHeight: 18 },
});
