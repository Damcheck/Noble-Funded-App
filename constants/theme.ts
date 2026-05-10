// Noble Funded — Design System Tokens
export const Colors = {
  // Core background layers
  darkBg: '#060f0e',
  darkBase: '#0a1c1a',
  darkMid: '#0d2421',

  // Brand
  primary: '#5eead4',     // Noble Mint
  secondary: '#0d9488',   // Noble Teal
  accent: '#14b8a6',

  // Text
  textPrimary: '#e2f5f2',
  textSecondary: '#6ea8a0',
  textMuted: '#4a7a74',

  // Status
  profit: '#4ade80',
  loss: '#f87171',
  danger: '#ef4444',
  warning: '#fbbf24',
  info: '#60a5fa',

  // Currency
  naira: '#fbbf24',
  dollar: '#5eead4',

  // Glass tints
  glassBg: 'rgba(10, 28, 26, 0.75)',
  glassBorder: 'rgba(94, 234, 212, 0.15)',
  glassHighlight: 'rgba(94, 234, 212, 0.08)',

  // Overlays
  overlay: 'rgba(6, 15, 14, 0.85)',

  // Borders
  border: 'rgba(20, 184, 166, 0.18)',
  borderSubtle: 'rgba(20, 184, 166, 0.08)',
};

export const Typography = {
  // Font sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 22,
  '2xl': 26,
  '3xl': 32,
  '4xl': 40,

  // Font weights (as strings for RN)
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,

  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  full: 999,
};

export const GlassStyle = {
  card: {
    backgroundColor: 'rgba(10, 28, 26, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.16)',
    borderRadius: 16,
  },
  surface: {
    backgroundColor: 'rgba(13, 36, 33, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.10)',
    borderRadius: 12,
  },
  input: {
    backgroundColor: 'rgba(13, 148, 136, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.18)',
    borderRadius: 12,
  },
};
