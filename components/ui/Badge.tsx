import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { AccountStatus } from '@/constants/data';

type BadgeVariant =
  | 'naira'
  | 'dollar'
  | 'active'
  | 'funded'
  | 'challenge'
  | 'failed'
  | 'passed'
  | 'pending'
  | 'processing'
  | 'paid'
  | 'rejected'
  | 'verified'
  | 'top'
  | 'rising'
  | 'mint';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

const badgeStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  naira: { bg: 'rgba(251,191,36,0.12)', text: Colors.warning, border: 'rgba(251,191,36,0.25)' },
  dollar: { bg: 'rgba(94,234,212,0.12)', text: Colors.primary, border: 'rgba(94,234,212,0.25)' },
  active: { bg: 'rgba(74,222,128,0.12)', text: Colors.profit, border: 'rgba(74,222,128,0.25)' },
  funded: { bg: 'rgba(94,234,212,0.15)', text: Colors.primary, border: 'rgba(94,234,212,0.3)' },
  challenge: { bg: 'rgba(251,191,36,0.12)', text: Colors.warning, border: 'rgba(251,191,36,0.25)' },
  failed: { bg: 'rgba(239,68,68,0.12)', text: Colors.loss, border: 'rgba(239,68,68,0.25)' },
  passed: { bg: 'rgba(94,234,212,0.12)', text: Colors.primary, border: 'rgba(94,234,212,0.25)' },
  pending: { bg: 'rgba(251,191,36,0.12)', text: Colors.warning, border: 'rgba(251,191,36,0.25)' },
  processing: { bg: 'rgba(96,165,250,0.12)', text: Colors.info, border: 'rgba(96,165,250,0.25)' },
  paid: { bg: 'rgba(74,222,128,0.12)', text: Colors.profit, border: 'rgba(74,222,128,0.25)' },
  rejected: { bg: 'rgba(239,68,68,0.12)', text: Colors.loss, border: 'rgba(239,68,68,0.25)' },
  verified: { bg: 'rgba(94,234,212,0.12)', text: Colors.primary, border: 'rgba(94,234,212,0.25)' },
  top: { bg: 'rgba(251,191,36,0.15)', text: Colors.warning, border: 'rgba(251,191,36,0.3)' },
  rising: { bg: 'rgba(94,234,212,0.12)', text: Colors.accent, border: 'rgba(94,234,212,0.25)' },
  mint: { bg: 'rgba(94,234,212,0.12)', text: Colors.primary, border: 'rgba(94,234,212,0.2)' },
};

export function Badge({ label, variant = 'mint', style, size = 'sm' }: BadgeProps) {
  const s = badgeStyles[variant];
  return (
    <View
      style={[
        styles.badge,
        size === 'md' && styles.badgeMd,
        { backgroundColor: s.bg, borderColor: s.border },
        style,
      ]}
    >
      <Text style={[styles.text, size === 'md' && styles.textMd, { color: s.text }]}>
        {label}
      </Text>
    </View>
  );
}

export function statusToBadgeVariant(status: AccountStatus): BadgeVariant {
  const map: Record<AccountStatus, BadgeVariant> = {
    active: 'active',
    challenge_phase1: 'challenge',
    challenge_phase2: 'challenge',
    failed: 'failed',
    passed: 'passed',
    funded: 'funded',
  };
  return map[status];
}

export function statusToLabel(status: AccountStatus): string {
  const map: Record<AccountStatus, string> = {
    active: 'Active',
    challenge_phase1: 'Phase 1',
    challenge_phase2: 'Phase 2',
    failed: 'Failed',
    passed: 'Passed',
    funded: 'Funded',
  };
  return map[status];
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  badgeMd: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    letterSpacing: 0.4,
  },
  textMd: {
    fontSize: Typography.sm,
  },
});
