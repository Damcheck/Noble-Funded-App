import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAppStore((s) => s.login);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#081d1a', '#030a09']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardInnerBorder}>
            {/* Sparkle Icon */}
            <Text style={styles.sparkle}>✦</Text>

            {/* Logo inside card */}
            <View style={styles.brand}>
              <Image 
                source={require('../../assets/images/logo.png')} 
                style={styles.logoImage} 
                resizeMode="contain" 
              />
            </View>

            <Text style={styles.cardTitle}>Sign in to your Noble Funded{'\n'}account</Text>

            <View style={styles.form}>
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Google Button */}
              <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.googleBtnText}>G</Text>
                <Text style={styles.googleBtnLabel}>Sign in with Google</Text>
              </TouchableOpacity>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  placeholder="Email@email.com"
                  placeholderTextColor="#7ab8b0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.customInput}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#7ab8b0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={[styles.customInput, { paddingRight: 44 }]}
                  />
                  <TouchableOpacity 
                    style={styles.eyeBtn}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                style={styles.forgotLink}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              <View style={styles.submitWrapper}>
                <TouchableOpacity onPress={handleLogin} disabled={loading} style={styles.submitBtnContainer}>
                  <LinearGradient
                    colors={['#00f0ff', '#00d4d4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.submitBtn}
                  >
                    <Text style={styles.submitBtnText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.toggleWrap}>
              <Text style={styles.toggleText}>Don't have a Noble Funded account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={styles.toggleLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1c1a',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  cardWrapper: {
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(26, 92, 99, 0.4)',
    backgroundColor: '#071513',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
    position: 'relative',
  },
  cardInnerBorder: {
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(26, 92, 99, 0.8)',
    backgroundColor: '#0a1a18',
    paddingHorizontal: 24,
    paddingVertical: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  sparkle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: '#ffffff',
    fontSize: 24,
    opacity: 0.8,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoImage: {
    width: 180,
    height: 40,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#f0f4f5',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 30,
  },
  form: {
    gap: 0,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.loss,
    fontSize: 14,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 30, 28, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(26, 92, 99, 0.6)',
    borderRadius: 14,
    marginBottom: 32,
  },
  googleBtnText: {
    color: '#4285F4', // Google blue for the G
    fontSize: 20,
    fontWeight: 'bold',
  },
  googleBtnLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    color: '#849b9f',
    marginBottom: 10,
  },
  customInput: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: 'rgba(4, 15, 14, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(26, 92, 99, 0.5)',
    borderRadius: 14,
    color: '#e0f0ee',
    fontSize: 15,
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  eyeText: {
    color: '#849b9f',
    fontSize: 12,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  forgotText: {
    color: '#00f0ff',
    fontSize: 13,
  },
  submitWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    // THE HUGE GLOW EFFECT
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 35,
    elevation: 20,
  },
  submitBtnContainer: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#041c20',
    fontSize: 16,
    fontWeight: '700',
  },
  toggleWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  toggleText: {
    color: '#7ab8b0',
    fontSize: 13,
  },
  toggleLink: {
    color: '#00f0ff',
    fontSize: 13,
    fontWeight: '500',
  },
});
