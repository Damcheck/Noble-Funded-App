import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQS = [
  {
    category: 'General',
    items: [
      { q: 'What is Noble Funded?', a: 'Noble Funded is a proprietary trading firm that provides simulated capital to skilled traders. Once you pass our evaluation, you can trade up to $200,000 or ₦3,000,000 of our capital and keep up to 90% of the profits.' },
      { q: 'Who can join?', a: 'Anyone over the age of 18 from an eligible country can participate. You will need to verify your identity via KYC before receiving your first payout.' },
      { q: 'What instruments can I trade?', a: 'You can trade Forex, Indices, Commodities (like Gold and Oil), and Cryptocurrencies on the MetaTrader 5 platform.' },
    ]
  },
  {
    category: 'Evaluation',
    items: [
      { q: 'How long do I have to pass?', a: 'There is no time limit to pass the challenge. Trade at your own pace. However, your account will be marked inactive if no trades are placed for 30 consecutive days.' },
      { q: 'Are EAs or Bots allowed?', a: 'No, Expert Advisors (EAs) and automated trading bots are strictly prohibited. All trading must be done manually.' },
      { q: 'Can I hold trades over the weekend?', a: 'No. All trades must be closed before the market closes for the weekend to avoid gap risks.' },
      { q: 'What is the consistency rule?', a: 'We do not apply any hidden consistency rules. Your trading style is entirely up to you as long as you follow the drawdown limits.' },
    ]
  },
  {
    category: 'Payouts',
    items: [
      { q: 'When can I request a payout?', a: 'Naira accounts feature 24-hour payouts with no minimum requirement. Dollar accounts feature Bi-Weekly (every 14 days) payouts with a $50 minimum.' },
      { q: 'How do I get paid?', a: 'Naira payouts are sent directly to your Nigerian bank account. Dollar payouts are sent via USDT Cryptocurrency or USD Bank Transfer.' },
      { q: 'What is the profit split?', a: 'Dollar accounts start at an 80/20 split and scale up to 90/10. Naira accounts use a two-tier system: 80/20 for the first 100% profit, and 60/40 up to the 200% maximum profit cap.' },
    ]
  }
];

function FaqAccordion({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggle} style={styles.accordionHeader} activeOpacity={0.7}>
        <Text style={styles.accordionTitle}>{q}</Text>
        <Text style={[styles.accordionIcon, open && styles.accordionIconOpen]}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.accordionBody}>
          <Text style={styles.accordionText}>{a}</Text>
        </View>
      )}
    </View>
  );
}

export default function FaqScreen() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);

  const currentCategory = FAQS.find(f => f.category === activeCategory);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>FAQ</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>Everything you need to know about trading with Noble Funded.</Text>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
          {FAQS.map(cat => (
            <TouchableOpacity
              key={cat.category}
              onPress={() => setActiveCategory(cat.category)}
              style={[styles.catBtn, activeCategory === cat.category && styles.catBtnActive]}
            >
              <Text style={[styles.catText, activeCategory === cat.category && styles.catTextActive]}>
                {cat.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Accordions */}
        <GlassCard style={styles.faqCard} variant="surface">
          <View style={styles.faqList}>
            {currentCategory?.items.map((item, i) => (
              <FaqAccordion key={i} q={item.q} a={item.a} />
            ))}
          </View>
        </GlassCard>

        {/* Support Callout */}
        <View style={styles.supportBox}>
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportText}>Our support team is available 24/7 on Discord.</Text>
          <TouchableOpacity style={styles.supportBtn} onPress={() => alert('Opening Discord...')}>
            <Text style={styles.supportBtnText}>Join our Discord Server</Text>
          </TouchableOpacity>
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

  catScroll: { marginBottom: 20 },
  catContent: { gap: 10 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: Radius.md, backgroundColor: 'rgba(13,148,136,0.1)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  catBtnActive: { backgroundColor: 'rgba(94,234,212,0.2)', borderColor: Colors.primary },
  catText: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary },
  catTextActive: { color: Colors.primary },

  faqCard: { padding: 0, overflow: 'hidden' },
  faqList: { gap: 1 },

  accordionContainer: { backgroundColor: 'rgba(13,148,136,0.03)', borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.06)' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  accordionTitle: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textPrimary, flex: 1, lineHeight: 20 },
  accordionIcon: { fontSize: 22, color: Colors.textMuted, fontWeight: '300', marginLeft: 16 },
  accordionIconOpen: { color: Colors.primary },
  accordionBody: { paddingHorizontal: 16, paddingBottom: 16 },
  accordionText: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 22 },

  supportBox: { marginTop: 24, padding: 20, borderRadius: Radius.lg, backgroundColor: 'rgba(20,184,166,0.1)', borderWidth: 1, borderColor: 'rgba(20,184,166,0.2)', alignItems: 'center' },
  supportTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 4 },
  supportText: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center', marginBottom: 16 },
  supportBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: Radius.md },
  supportBtnText: { color: Colors.darkBg, fontWeight: Typography.bold, fontSize: Typography.sm },
});
