import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={['#060f0e', '#071412', '#060f0e']} style={StyleSheet.absoluteFill} />
      <View style={styles.topGlow} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.brand}>
          <Text style={styles.emoji}>🔐</Text>
          <Text style={styles.cardTitle}>Reset Password</Text>
          <Text style={styles.cardSubtitle}>
            Enter your email and we'll send you a reset link.
          </Text>
        </View>

        <View style={styles.card}>
          <BlurView intensity={18} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.cardOverlay} />
          <View style={styles.cardShimmer} />
          <View style={styles.cardContent}>
            {sent ? (
              <View style={styles.successBox}>
                <Text style={styles.successTitle}>Email Sent! ✅</Text>
                <Text style={styles.successText}>
                  Check your inbox for a password reset link. It may take a few minutes.
                </Text>
                <Button label="Back to Login" onPress={() => router.replace('/(auth)/login')} fullWidth style={{ marginTop: 20 }} />
              </View>
            ) : (
              <>
                <InputField
                  label="Email Address"
                  placeholder="trader@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Button
                  label="Send Reset Link"
                  onPress={handleReset}
                  loading={loading}
                  fullWidth
                  size="lg"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBg },
  topGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(13,148,136,0.10)', borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  backBtn: { marginBottom: 20 },
  backText: { color: Colors.primary, fontSize: Typography.base, fontWeight: Typography.medium },
  brand: { alignItems: 'center', marginBottom: 32 },
  emoji: { fontSize: 64, marginBottom: 16 },
  cardTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  cardSubtitle: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  card: { borderRadius: Radius.xl, borderWidth: 1, borderColor: 'rgba(94,234,212,0.16)', overflow: 'hidden', position: 'relative' },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,28,26,0.60)' },
  cardShimmer: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(94,234,212,0.35)' },
  cardContent: { padding: 28 },
  successBox: { alignItems: 'center' },
  successTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.profit, marginBottom: 10 },
  successText: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
});
