import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Radius } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  iconRight,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { paddingVertical: 9, paddingHorizontal: 16, fontSize: Typography.sm, radius: Radius.md },
    md: { paddingVertical: 14, paddingHorizontal: 24, fontSize: Typography.base, radius: Radius.md },
    lg: { paddingVertical: 17, paddingHorizontal: 32, fontSize: Typography.md, radius: Radius.lg },
  }[size];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[{ borderRadius: sizeStyles.radius }, fullWidth && { width: '100%' }, style, styles.shadow]}
        activeOpacity={0.82}
      >
        <LinearGradient
          colors={isDisabled ? ['#1a4540', '#0d3330'] : ['#2dd4bf', '#0f3f3a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.base,
            { paddingVertical: sizeStyles.paddingVertical, paddingHorizontal: sizeStyles.paddingHorizontal },
            styles.metallicWrapper
          ]}
        >
          {/* Top highlight for 3D effect */}
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[StyleSheet.absoluteFill, { height: '50%', borderTopLeftRadius: sizeStyles.radius, borderTopRightRadius: sizeStyles.radius }]}
          />
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          {loading ? (
            <ActivityIndicator size="small" color={Colors.textPrimary} />
          ) : (
            <Text style={[styles.primaryText, { fontSize: sizeStyles.fontSize }, textStyle]}>
              {label}
            </Text>
          )}
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const outlineStyle: ViewStyle = {
    borderWidth: 1,
    borderColor:
      variant === 'danger'
        ? 'rgba(239,68,68,0.45)'
        : variant === 'outline'
        ? 'rgba(94,234,212,0.35)'
        : 'transparent',
    backgroundColor:
      variant === 'secondary'
        ? 'rgba(13,148,136,0.15)'
        : variant === 'danger'
        ? 'rgba(239,68,68,0.10)'
        : variant === 'outline'
        ? 'rgba(94,234,212,0.06)'
        : 'transparent',
    borderRadius: sizeStyles.radius,
    paddingVertical: sizeStyles.paddingVertical,
    paddingHorizontal: sizeStyles.paddingHorizontal,
    opacity: isDisabled ? 0.5 : 1,
  };

  const textColor =
    variant === 'danger'
      ? Colors.loss
      : variant === 'ghost'
      ? Colors.textSecondary
      : Colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.base, outlineStyle, fullWidth && { width: '100%' }, style]}
      activeOpacity={0.75}
    >
      {icon && <View style={styles.iconLeft}>{icon}</View>}
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, { fontSize: sizeStyles.fontSize, color: textColor }, textStyle]}>
          {label}
        </Text>
      )}
      {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: Typography.black,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  shadow: {
    shadowColor: '#5eead4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  metallicWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.4)',
  },
  text: {
    fontWeight: Typography.semibold,
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
