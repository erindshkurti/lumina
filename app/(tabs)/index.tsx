import { BatteryWidget } from '@/components/dashboard/BatteryWidget';
import { DeviceWidget } from '@/components/dashboard/DeviceWidget';
import { LocationWidget } from '@/components/dashboard/LocationWidget';
import { PermissionTesterWidget } from '@/components/dashboard/PermissionTesterWidget';
import { PrivacyLogWidget } from '@/components/dashboard/PrivacyLogWidget';
import { SensorWidget } from '@/components/dashboard/SensorWidget';
import { StatusHeader } from '@/components/dashboard/StatusHeader';
import { SafeScreen } from '@/components/ui/SafeScreen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusHeader />
        <BatteryWidget />
        <DeviceWidget />
        <SensorWidget />
        <LocationWidget />
        <PermissionTesterWidget />
        <PrivacyLogWidget />
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
