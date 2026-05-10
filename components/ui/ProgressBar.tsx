import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Typography } from '@/constants/theme';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'danger' | 'warning' | 'success';
  style?: StyleProp<ViewStyle>;
  height?: number;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'default',
  style,
  height = 5,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const fillColors: Record<string, [string, string]> = {
    default: ['#0d9488', '#5eead4'],
    danger: ['#7f1d1d', '#ef4444'],
    warning: ['#92400e', '#fbbf24'],
    success: ['#14532d', '#4ade80'],
  };

  const [colorStart, colorEnd] = fillColors[variant];

  return (
    <View style={style}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={[styles.value, { color: fillColors[variant][1] }]}>{pct.toFixed(1)}%</Text>}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${pct}%`,
              height,
              backgroundColor: pct > 80 ? colorEnd : colorStart,
            },
          ]}
        />
      </View>
    </View>
  );
}

interface StatRowProps {
  label: string;
  value: string;
  subValue?: string;
  valueColor?: string;
  progress?: number;
  progressVariant?: 'default' | 'danger' | 'warning' | 'success';
}

export function StatRow({ label, value, subValue, valueColor, progress, progressVariant }: StatRowProps) {
  return (
    <View style={statStyles.row}>
      <View style={statStyles.left}>
        <Text style={statStyles.label}>{label}</Text>
        {progress !== undefined && (
          <ProgressBar
            value={progress}
            style={{ marginTop: 4 }}
            variant={progressVariant}
          />
        )}
      </View>
      <View style={statStyles.right}>
        <Text style={[statStyles.value, valueColor ? { color: valueColor } : undefined]}>{value}</Text>
        {subValue && <Text style={statStyles.subValue}>{subValue}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
  },
  track: {
    backgroundColor: 'rgba(20,184,166,0.12)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 99,
  },
});

const statStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(20,184,166,0.08)',
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.semibold,
  },
  subValue: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
