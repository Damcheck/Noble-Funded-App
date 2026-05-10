import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Radius } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { Camera, Check } from 'lucide-react-native';

export default function EditProfileScreen() {
  const { user } = useAppStore();
  const [fullName, setFullName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [country, setCountry] = useState(user?.country ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert('Error', 'Full name and email are required.');
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    Alert.alert('Success', 'Your profile has been updated!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#060f0e', '#071412']} style={StyleSheet.absoluteFill} />

      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <LinearGradient colors={['#0d9488', '#5eead4']} style={styles.avatar}>
              <Text style={styles.avatarText}>{fullName?.[0]?.toUpperCase() ?? 'T'}</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.cameraBtn}>
              <LinearGradient colors={['#0d9488', '#5eead4']} style={styles.cameraBtnInner}>
                <Camera size={14} color="#041c20" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>

        {/* Form */}
        <GlassCard style={styles.card} variant="surface">
          <Text style={styles.sectionLabel}>PERSONAL INFORMATION</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your full name"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+234 801 234 5678"
              placeholderTextColor={Colors.textMuted}
              keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.fieldGroup, { marginBottom: 0 }]}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              value={country}
              onChangeText={setCountry}
              placeholder="Nigeria"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </GlassCard>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} disabled={saving} activeOpacity={0.85}>
          <LinearGradient
            colors={['#00f0ff', '#00d4d4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtn}
          >
            <Check size={18} color="#041c20" />
            <Text style={styles.saveBtnText}>{saving ? 'Saving Changes...' : 'Save Changes'}</Text>
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

  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarWrap: { position: 'relative', marginBottom: 8 },
  avatar: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 40, fontWeight: '900', color: '#041c20' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, borderRadius: 14, overflow: 'hidden', borderWidth: 2, borderColor: Colors.darkBg },
  cameraBtnInner: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  avatarHint: { fontSize: Typography.xs, color: Colors.textMuted },

  card: { padding: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1.2, marginBottom: 16 },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: Typography.xs, color: Colors.textMuted, marginBottom: 8, fontWeight: Typography.medium },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(94,234,212,0.18)',
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: Colors.textPrimary,
    fontSize: Typography.base,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  saveBtnText: { color: '#041c20', fontSize: 16, fontWeight: '700' },
});
