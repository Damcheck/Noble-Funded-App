import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/Button';
import { Check, Hourglass, BookOpen, IdCard, Car, Camera as CameraIcon, User as UserIcon } from 'lucide-react-native';

type DocType = 'passport' | 'id_card' | 'driver_license';

export default function KycScreen() {
  const { user } = useAppStore();
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState<DocType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Your documents have been submitted for review. This usually takes 1-2 business days.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 2000);
  };

  const renderStatus = () => {
    if (user?.kycStatus === 'verified') {
      return (
        <GlassCard style={styles.statusCard} variant="surface">
          <View style={styles.verifiedIconWrap}>
            <Check size={32} color={Colors.profit} />
          </View>
          <Text style={styles.statusTitle}>Identity Verified</Text>
          <Text style={styles.statusText}>
            Your identity has been successfully verified. You are eligible to receive payouts.
          </Text>
        </GlassCard>
      );
    }
    if (user?.kycStatus === 'pending') {
      return (
        <GlassCard style={[styles.statusCard, { borderColor: 'rgba(251,191,36,0.3)' }]} variant="surface">
          <View style={[styles.verifiedIconWrap, { backgroundColor: 'rgba(251,191,36,0.2)' }]}>
            <Hourglass size={32} color={Colors.warning} />
          </View>
          <Text style={styles.statusTitle}>Verification Pending</Text>
          <Text style={styles.statusText}>
            We are currently reviewing your documents. We will notify you once complete.
          </Text>
        </GlassCard>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />
      
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Identity Verification</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {renderStatus()}

        {user?.kycStatus === 'unverified' && (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Complete KYC</Text>
              <Text style={styles.subtitle}>
                To comply with AML regulations and process payouts, we need to verify your identity.
              </Text>
            </View>

            {/* Stepper */}
            <View style={styles.stepper}>
              <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}><Text style={styles.stepNum}>1</Text></View>
              <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />
              <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}><Text style={styles.stepNum}>2</Text></View>
              <View style={[styles.stepLine, step >= 3 && styles.stepLineActive]} />
              <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]}><Text style={styles.stepNum}>3</Text></View>
            </View>
            <View style={styles.stepperLabels}>
              <Text style={styles.stepperLabel}>Document</Text>
              <Text style={[styles.stepperLabel, { textAlign: 'center' }]}>Upload</Text>
              <Text style={[styles.stepperLabel, { textAlign: 'right' }]}>Selfie</Text>
            </View>

            {/* Step 1: Document Type */}
            {step === 1 && (
              <GlassCard style={styles.stepCard} variant="surface">
                <Text style={styles.stepTitle}>Select Document Type</Text>
                <View style={styles.docGrid}>
                  {[
                    { id: 'passport', label: 'Passport', icon: <BookOpen size={24} color={Colors.primary} /> },
                    { id: 'id_card', label: 'National ID', icon: <IdCard size={24} color={Colors.primary} /> },
                    { id: 'driver_license', label: 'Driver\'s License', icon: <Car size={24} color={Colors.primary} /> }
                  ].map(doc => (
                    <TouchableOpacity
                      key={doc.id}
                      style={[styles.docBtn, docType === doc.id && styles.docBtnActive]}
                      onPress={() => setDocType(doc.id as DocType)}
                    >
                      <View style={{ marginRight: 16 }}>{doc.icon}</View>
                      <Text style={styles.docLabel}>{doc.label}</Text>
                      {docType === doc.id && <View style={styles.docCheck}><Check size={12} color={Colors.darkBg} strokeWidth={4} /></View>}
                    </TouchableOpacity>
                  ))}
                </View>
                <Button label="Continue" onPress={() => setStep(2)} disabled={!docType} fullWidth style={{ marginTop: 20 }} />
              </GlassCard>
            )}

            {/* Step 2: Upload */}
            {step === 2 && (
              <GlassCard style={styles.stepCard} variant="surface">
                <Text style={styles.stepTitle}>Upload Documents</Text>
                
                <Text style={styles.uploadLabel}>Front of Document</Text>
                <TouchableOpacity style={styles.uploadBox}>
                  <CameraIcon size={32} color={Colors.primary} style={{ marginBottom: 8 }} />
                  <Text style={styles.uploadText}>Tap to take a photo</Text>
                </TouchableOpacity>

                {docType !== 'passport' && (
                  <>
                    <Text style={styles.uploadLabel}>Back of Document</Text>
                    <TouchableOpacity style={styles.uploadBox}>
                      <CameraIcon size={32} color={Colors.primary} style={{ marginBottom: 8 }} />
                      <Text style={styles.uploadText}>Tap to take a photo</Text>
                    </TouchableOpacity>
                  </>
                )}

                <View style={styles.btnRow}>
                  <Button label="Back" onPress={() => setStep(1)} variant="secondary" style={{ flex: 1 }} />
                  <View style={{ width: 12 }} />
                  <Button label="Continue" onPress={() => setStep(3)} style={{ flex: 1 }} />
                </View>
              </GlassCard>
            )}

            {/* Step 3: Selfie */}
            {step === 3 && (
              <GlassCard style={styles.stepCard} variant="surface">
                <Text style={styles.stepTitle}>Take a Selfie</Text>
                <Text style={styles.stepDesc}>
                  Please take a selfie to match with your identity document. Ensure your face is clearly visible and well-lit.
                </Text>

                <View style={styles.selfieBox}>
                  <View style={styles.selfieCircle}>
                    <UserIcon size={40} color={Colors.primary} />
                  </View>
                </View>
                <TouchableOpacity style={styles.uploadBox}>
                  <CameraIcon size={32} color={Colors.primary} style={{ marginBottom: 8 }} />
                  <Text style={styles.uploadText}>Open Camera</Text>
                </TouchableOpacity>

                <View style={styles.btnRow}>
                  <Button label="Back" onPress={() => setStep(2)} variant="secondary" style={{ flex: 1 }} />
                  <View style={{ width: 12 }} />
                  <Button label="Submit KYC" onPress={handleSubmit} loading={isSubmitting} style={{ flex: 1 }} />
                </View>
              </GlassCard>
            )}
          </>
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
  
  statusCard: { alignItems: 'center', paddingVertical: 32, marginBottom: 20 },
  verifiedIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(20,184,166,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  verifiedIcon: { fontSize: 32 },
  statusTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 8 },
  statusText: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: 20, lineHeight: 20 },

  header: { marginBottom: 24 },
  title: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20 },

  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 },
  stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(94,234,212,0.1)', alignItems: 'center', justifyContent: 'center' },
  stepDotActive: { backgroundColor: Colors.primary },
  stepNum: { fontSize: 12, fontWeight: Typography.bold, color: Colors.darkBg },
  stepLine: { flex: 1, height: 2, backgroundColor: 'rgba(94,234,212,0.1)', marginHorizontal: 8 },
  stepLineActive: { backgroundColor: Colors.primary },
  stepperLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 24 },
  stepperLabel: { fontSize: 10, color: Colors.textMuted, flex: 1 },

  stepCard: { padding: 20 },
  stepTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 16 },
  stepDesc: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: 20 },
  
  docGrid: { gap: 12 },
  docBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(13,148,136,0.1)', borderRadius: Radius.md, borderWidth: 1, borderColor: 'rgba(94,234,212,0.1)' },
  docBtnActive: { borderColor: Colors.primary, backgroundColor: 'rgba(20,184,166,0.15)' },
  docIcon: { fontSize: 24, marginRight: 16 },
  docLabel: { flex: 1, fontSize: Typography.base, fontWeight: Typography.medium, color: Colors.textPrimary },
  docCheck: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  docCheckText: { fontSize: 10, fontWeight: Typography.black, color: Colors.darkBg },

  uploadLabel: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary, marginBottom: 8, marginTop: 16 },
  uploadBox: { height: 120, borderStyle: 'dashed', borderWidth: 2, borderColor: 'rgba(94,234,212,0.3)', borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(13,148,136,0.05)' },
  uploadIcon: { fontSize: 32, marginBottom: 8 },
  uploadText: { fontSize: Typography.sm, color: Colors.textMuted },
  
  selfieBox: { alignItems: 'center', marginBottom: 20 },
  selfieCircle: { width: 140, height: 140, borderRadius: 70, borderStyle: 'dashed', borderWidth: 2, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(13,148,136,0.05)' },

  btnRow: { flexDirection: 'row', marginTop: 24 },
});
