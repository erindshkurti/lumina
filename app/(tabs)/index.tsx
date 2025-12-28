import { BatteryWidget } from '@/components/dashboard/BatteryWidget';
import { DeviceWidget } from '@/components/dashboard/DeviceWidget';
import { PermissionTesterWidget } from '@/components/dashboard/PermissionTesterWidget';
import { PrivacyLogWidget } from '@/components/dashboard/PrivacyLogWidget';
import { SensorWidget } from '@/components/dashboard/SensorWidget';
import { StatusHeader } from '@/components/dashboard/StatusHeader';
import { SafeScreen } from '@/components/ui/SafeScreen';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AnimatedCard } from '@/components/ui/AnimatedCard';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: theme.tint }]}>
              <Text style={styles.logoText}>L</Text>
            </View>
            <Text style={[styles.appName, { color: theme.text }]}>Lumina</Text>
          </View>
        </View>

        <AnimatedCard index={0}><DeviceWidget /></AnimatedCard>
        <AnimatedCard index={1}><StatusHeader /></AnimatedCard>
        <AnimatedCard index={2}><BatteryWidget /></AnimatedCard>
        <AnimatedCard index={3}><SensorWidget /></AnimatedCard>
        <AnimatedCard index={4}><PermissionTesterWidget /></AnimatedCard>
        <AnimatedCard index={5}><PrivacyLogWidget /></AnimatedCard>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
});
