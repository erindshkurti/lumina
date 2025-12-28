import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDeviceInfo } from '@/hooks/useDevice';
import { Cpu, HardDrive, Smartphone } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function DeviceWidget() {
    const info = useDeviceInfo();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const memoryGB = info.totalMemory
        ? (info.totalMemory / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
        : 'Unknown';

    return (
        <Card title="Device" subtitle={info.modelName || 'Unknown Device'}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Smartphone size={20} color={theme.icon} />
                    <Text style={[styles.text, { color: theme.text }]}>
                        {info.brand} {info.designName}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Cpu size={20} color={theme.icon} />
                    <Text style={[styles.text, { color: theme.text }]}>
                        {info.osName} {info.osVersion}
                    </Text>
                </View>

                <View style={styles.row}>
                    <HardDrive size={20} color={theme.icon} />
                    <Text style={[styles.text, { color: theme.text }]}>
                        RAM: {memoryGB}
                    </Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    text: {
        fontSize: 15,
        fontFamily: Fonts.medium,
    },
});
