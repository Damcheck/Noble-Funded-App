import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Book, MessageSquare, Mail, ChevronDown, ChevronUp } from 'lucide-react-native';

const TOPICS = [
  'General Question',
  'Payout Issue',
  'Account Breach Inquiry',
  'KYC Problem',
  'Platform Bug',
];

export default function SupportScreen() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [showTopics, setShowTopics] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Ticket Created', 'Your message has been sent to our support team. We will reply to your registered email shortly.', [
        { text: 'OK', onPress: () => { setMessage(''); router.back(); } }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Help & Support</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>How can we help?</Text>
          <Text style={styles.subtitle}>Create a support ticket or reach out to us directly on Discord.</Text>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksRow}>
          <TouchableOpacity style={styles.quickLink} onPress={() => router.push('/faq')}>
            <Book size={24} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={styles.quickLabel}>Read FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={() => Linking.openURL('https://discord.gg')}>
            <MessageSquare size={24} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={styles.quickLabel}>Discord</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={() => Linking.openURL('mailto:support@noblefunded.com')}>
            <Mail size={24} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={styles.quickLabel}>Email Us</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <GlassCard style={styles.formCard} variant="surface">
          <Text style={styles.cardTitle}>Create a Support Ticket</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Topic</Text>
            <TouchableOpacity
              style={styles.dropdownBtn}
              onPress={() => setShowTopics(!showTopics)}
            >
              <Text style={styles.dropdownText}>{topic}</Text>
              {showTopics ? <ChevronUp size={16} color={Colors.textMuted} /> : <ChevronDown size={16} color={Colors.textMuted} />}
            </TouchableOpacity>

            {showTopics && (
              <View style={styles.dropdownList}>
                {TOPICS.map(t => (
                  <TouchableOpacity
                    key={t}
                    style={styles.dropdownItem}
                    onPress={() => { setTopic(t); setShowTopics(false); }}
                  >
                    <Text style={[styles.dropdownItemText, topic === t && { color: Colors.primary, fontWeight: Typography.bold }]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={styles.textArea}
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue in detail..."
              placeholderTextColor={Colors.textMuted}
              multiline
              textAlignVertical="top"
            />
          </View>

          <Button label="Submit Ticket" onPress={handleSubmit} loading={isSubmitting} fullWidth />
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
  
  header: { marginBottom: 24 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20 },

  quickLinksRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  quickLink: { flex: 1, alignItems: 'center', paddingVertical: 16, backgroundColor: 'rgba(13,148,136,0.1)', borderRadius: Radius.lg, borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  quickLabel: { fontSize: Typography.xs, fontWeight: Typography.semibold, color: Colors.textSecondary },

  formCard: { padding: 20 },
  cardTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 20 },

  inputGroup: { marginBottom: 20, zIndex: 1 },
  label: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 8, fontWeight: Typography.medium },
  
  dropdownBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.15)', borderRadius: Radius.md, paddingHorizontal: 16, paddingVertical: 14 },
  dropdownText: { fontSize: Typography.sm, color: Colors.textPrimary },
  
  dropdownList: { position: 'absolute', top: 70, left: 0, right: 0, backgroundColor: '#0f2926', borderWidth: 1, borderColor: 'rgba(94,234,212,0.2)', borderRadius: Radius.md, zIndex: 10, overflow: 'hidden' },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(94,234,212,0.05)' },
  dropdownItemText: { fontSize: Typography.sm, color: Colors.textSecondary },

  textArea: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(94,234,212,0.15)', borderRadius: Radius.md, paddingHorizontal: 16, paddingVertical: 14, color: Colors.textPrimary, fontSize: Typography.sm, minHeight: 120 },
});
