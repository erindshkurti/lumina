import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSensors } from '@/hooks/useSensors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function SensorWidget() {
    const { data, available } = useSensors();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const formatValue = (val: number) => val.toFixed(2);

    return (
        <Card title="Accelerometer" subtitle="Motion Sensors">
            <View style={styles.container}>
                {!available ? (
                    <Text style={[styles.text, { color: theme.textSecondary }]}>Sensor not available</Text>
                ) : (
                    <>
                        <View style={styles.row}>
                            <View style={styles.axisItem}>
                                <Text style={[styles.axisLabel, { color: theme.textSecondary }]}>X</Text>
                                <Text style={[styles.axisValue, { color: theme.text }]}>{formatValue(data.x)}</Text>
                            </View>
                            <View style={styles.axisItem}>
                                <Text style={[styles.axisLabel, { color: theme.textSecondary }]}>Y</Text>
                                <Text style={[styles.axisValue, { color: theme.text }]}>{formatValue(data.y)}</Text>
                            </View>
                            <View style={styles.axisItem}>
                                <Text style={[styles.axisLabel, { color: theme.textSecondary }]}>Z</Text>
                                <Text style={[styles.axisValue, { color: theme.text }]}>{formatValue(data.z)}</Text>
                            </View>
                        </View>
                        <View style={[styles.visualizer, { backgroundColor: theme.border }]}>
                            {/* Simple visualizer dot */}
                            <View
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor: theme.tint,
                                        transform: [
                                            { translateX: data.x * 50 },
                                            { translateY: data.y * -50 } // Invert Y for screen coords
                                        ]
                                    }
                                ]}
                            />
                        </View>
                    </>
                )}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    text: {
        fontFamily: Fonts.medium,
        textAlign: 'center',
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    axisItem: {
        alignItems: 'center',
    },
    axisLabel: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        marginBottom: 4,
    },
    axisValue: {
        fontSize: 18,
        fontFamily: Fonts.mono,
        fontWeight: '600',
    },
    visualizer: {
        height: 120,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
    }
});
