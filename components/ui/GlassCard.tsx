import React from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '@/constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  variant?: 'default' | 'danger' | 'success' | 'surface';
  noPadding?: boolean;
}

export function GlassCard({
  children,
  style,
  intensity = 40,
  variant = 'default',
  noPadding = false,
}: GlassCardProps) {
  const borderColor = {
    default: 'rgba(94, 234, 212, 0.16)',
    danger: 'rgba(239, 68, 68, 0.22)',
    success: 'rgba(74, 222, 128, 0.22)',
    surface: 'rgba(94, 234, 212, 0.10)',
  }[variant];

  return (
    <View style={[styles.wrapper, { borderColor }, style]}>
      <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient 
        colors={[
          'rgba(255,255,255,0.08)', 
          'rgba(255,255,255,0.01)', 
          'rgba(0,0,0,0.5)', 
          'rgba(13,148,136,0.1)'
        ]} 
        locations={[0, 0.2, 0.8, 1]}
        style={StyleSheet.absoluteFill} 
      />
      <View style={[styles.overlay, getOverlayColor(variant)]} />
      <View style={[styles.shimmer, getShimmerColor(variant)]} />
      {/* Side Highlights for liquid feel */}
      <LinearGradient 
        colors={['rgba(94, 234, 212, 0.4)', 'transparent']} 
        start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
        style={[StyleSheet.absoluteFill, { width: 1 }]} 
      />
      <LinearGradient 
        colors={['rgba(94, 234, 212, 0.2)', 'transparent']} 
        start={{x: 1, y: 0}} end={{x: 1, y: 1}} 
        style={[StyleSheet.absoluteFill, { left: undefined, right: 0, width: 1 }]} 
      />
      <View style={noPadding ? undefined : styles.content}>{children}</View>
    </View>
  );
}

function getOverlayColor(variant: string): ViewStyle {
  const colors: Record<string, string> = {
    default: 'rgba(10, 28, 26, 0.55)',
    danger: 'rgba(40, 5, 5, 0.6)',
    success: 'rgba(5, 30, 10, 0.55)',
    surface: 'rgba(10, 28, 26, 0.70)',
  };
  return { backgroundColor: colors[variant] };
}

function getShimmerColor(variant: string): ViewStyle {
  const colors: Record<string, string> = {
    default: 'rgba(94, 234, 212, 0.3)',
    danger: 'rgba(248, 113, 113, 0.3)',
    success: 'rgba(74, 222, 128, 0.3)',
    surface: 'rgba(94, 234, 212, 0.15)',
  };
  return { backgroundColor: colors[variant] };
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: '5%',
    right: '5%',
    height: 1.5,
    opacity: 0.8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
});
