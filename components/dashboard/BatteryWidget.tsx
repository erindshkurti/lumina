import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useBattery } from '@/hooks/useBattery';
import * as ExpoBattery from 'expo-battery';
import { Battery, BatteryFull, BatteryLow, BatteryMedium, Zap } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function BatteryWidget() {
    const { level, state, lowPowerMode } = useBattery();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const percentage = level !== null ? Math.round(level * 100) : 0;
    const isCharging = state === ExpoBattery.BatteryState.CHARGING || state === ExpoBattery.BatteryState.FULL;

    // Dynamic color logic
    let statusColor = theme.text;
    if (percentage <= 20 && !isCharging) statusColor = theme.error;
    else if (isCharging) statusColor = theme.success;
    else if (percentage > 20) statusColor = theme.text;

    const renderIcon = () => {
        if (isCharging) return <Zap size={32} color={statusColor} />;
        if (percentage <= 20) return <BatteryLow size={32} color={statusColor} />;
        if (percentage <= 50) return <BatteryMedium size={32} color={statusColor} />;
        if (percentage < 100) return <BatteryFull size={32} color={statusColor} />;
        return <Battery size={32} color={statusColor} />;
    };

    return (
        <Card title="Battery" subtitle={isCharging ? "Charging" : "Discharging"}>
            <View style={styles.container}>
                <View style={styles.infoRow}>
                    <Text style={[styles.percentage, { color: statusColor }]}>{percentage}%</Text>
                    {renderIcon()}
                </View>
                <View style={styles.metaRow}>
                    <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        {lowPowerMode ? 'Low Power Mode: On' : 'Performance Mode'}
                    </Text>
                </View>

                {/* Visual Bar */}
                <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: `${percentage}%`,
                                backgroundColor: statusColor
                            }
                        ]}
                    />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    percentage: {
        fontSize: 42,
        fontFamily: Fonts.bold,
        fontWeight: '700',
    },
    metaRow: {
        flexDirection: 'row',
    },
    metaText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
    },
    progressBarBg: {
        height: 8,
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
});
