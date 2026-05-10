import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  return props.dark ?? Colors.textPrimary;
}
