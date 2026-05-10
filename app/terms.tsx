import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Legal</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.subtitle}>Last updated: March 2025</Text>
        </View>

        <GlassCard style={styles.contentCard} variant="surface">
          <Text style={styles.h2}>1. Acceptance of Terms</Text>
          <Text style={styles.p}>
            By accessing and using the Noble Funded platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
          </Text>

          <Text style={styles.h2}>2. Eligibility</Text>
          <Text style={styles.p}>
            You must be at least 18 years old to use our services. You are responsible for ensuring that your participation complies with the laws of your jurisdiction. Users from restricted countries (as updated on our website) are prohibited from using the platform.
          </Text>

          <Text style={styles.h2}>3. Evaluation Accounts</Text>
          <Text style={styles.p}>
            The evaluation phase (Challenge) is a simulation. You are provided with simulated capital in a simulated environment. The fees paid for these challenges are non-refundable once any trade has been placed on the account.
          </Text>

          <Text style={styles.h2}>4. Trading Rules</Text>
          <Text style={styles.p}>
            You must adhere to the trading rules specific to your account type (Naira or Dollar). Violations of these rules, including but not limited to exceeding maximum drawdowns or using prohibited strategies (e.g., EAs, Copy Trading, Tick Scalping), will result in immediate account termination.
          </Text>

          <Text style={styles.h2}>5. Payouts and Profit Splits</Text>
          <Text style={styles.p}>
            Upon successful completion of the evaluation phases and KYC verification, you will receive a funded account. Payouts are subject to the profit split agreements outlined in the rules. Noble Funded reserves the right to withhold payouts if suspicious or prohibited trading activity is detected.
          </Text>

          <Text style={styles.h2}>6. KYC Verification</Text>
          <Text style={styles.p}>
            Before receiving any payout, you must successfully complete our KYC verification process. This requires providing valid government-issued identification and proof of address.
          </Text>

          <Text style={styles.h2}>7. Prohibited Uses</Text>
          <Text style={styles.p}>
            You may not use the platform for any illegal purpose. You may not attempt to manipulate the simulated environment or exploit platform vulnerabilities. Group trading, account sharing, and utilizing third-party account management services are strictly forbidden.
          </Text>

          <Text style={styles.h2}>8. Privacy Policy</Text>
          <Text style={styles.p}>
            Your use of the platform is also governed by our Privacy Policy. We collect and store personal information required for KYC and payout processing in accordance with applicable data protection laws. We do not sell your personal data to third parties.
          </Text>

          <Text style={styles.h2}>9. Changes to Terms</Text>
          <Text style={styles.p}>
            Noble Funded reserves the right to modify these terms at any time. Significant changes will be communicated via email or platform announcements. Continued use of the platform after changes constitutes acceptance of the new terms.
          </Text>
          
          <Text style={styles.h2}>10. Contact Us</Text>
          <Text style={styles.p}>
            If you have any questions about these Terms, please contact our support team via our official Discord server or support email.
          </Text>
        </GlassCard>

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

  contentCard: { padding: 20 },
  h2: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.primary, marginTop: 16, marginBottom: 8 },
  p: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 22, marginBottom: 12 },
});
