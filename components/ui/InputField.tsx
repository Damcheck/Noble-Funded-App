import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Radius } from '@/constants/theme';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

export function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  inputStyle,
  error,
  leftIcon,
  rightIcon,
  multiline,
  numberOfLines,
  editable = true,
}: InputFieldProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          focused && styles.inputFocused,
          !!error && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, inputStyle]}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.18)',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 2,
    minHeight: 50,
  },
  inputFocused: {
    borderColor: 'rgba(94, 234, 212, 0.5)',
    backgroundColor: 'rgba(13, 148, 136, 0.10)',
  },
  inputError: {
    borderColor: 'rgba(239, 68, 68, 0.45)',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.regular,
    paddingVertical: 10,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: Typography.xs,
    color: Colors.loss,
    marginTop: 5,
  },
});
