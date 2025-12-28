import { Platform } from 'react-native';

const tintColorLight = '#0891b2'; // Cyan 600
const tintColorDark = '#22d3ee'; // Cyan 400

export const Colors = {
  light: {
    text: '#0f172a', // Slate 900
    textSecondary: '#64748b', // Slate 500
    background: '#f8fafc', // Slate 50
    card: '#ffffff',
    border: '#e2e8f0', // Slate 200
    tint: tintColorLight,
    icon: '#64748b', // Slate 500
    tabIconDefault: '#94a3b8', // Slate 400
    tabIconSelected: tintColorLight,
    success: '#10b981', // Emerald 500
    warning: '#f59e0b', // Amber 500
    error: '#ef4444', // Red 500
  },
  dark: {
    text: '#f1f5f9', // Slate 100
    textSecondary: '#94a3b8', // Slate 400
    background: '#020617', // Slate 950
    card: '#1e293b', // Slate 800
    border: '#334155', // Slate 700
    tint: tintColorDark,
    icon: '#94a3b8', // Slate 400
    tabIconDefault: '#64748b', // Slate 500
    tabIconSelected: tintColorDark,
    success: '#34d399', // Emerald 400
    warning: '#fbbf24', // Amber 400
    error: '#f87171', // Red 400
  },
};

export const Fonts = Platform.select({
  ios: {
    regular: 'system-ui',
    medium: 'system-ui', // Weight 500
    bold: 'system-ui',   // Weight 700
    mono: 'ui-monospace',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto_500Medium',
    bold: 'Roboto_700Bold',
    mono: 'monospace',
  },
  default: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'monospace',
  },
});
