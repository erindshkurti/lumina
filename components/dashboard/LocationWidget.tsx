import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocationStatus } from '@/hooks/useLocationStatus';
import * as Location from 'expo-location';
import { Check, MapPin, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function LocationWidget() {
    const { status, enabled } = useLocationStatus();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    // Also request permission on mount if not determined?
    // Ideally we don't spam, but for a monitor app user might want to see it green.
    const [permission, setPermission] = useState(status);

    useEffect(() => {
        setPermission(status);
    }, [status]);

    const requestPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermission(status);
    };

    const isGranted = permission === Location.PermissionStatus.GRANTED;

    return (
        <Card title="Location Services" subtitle="GPS Status">
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <MapPin color={theme.text} size={24} />
                    </View>
                    <View style={styles.info}>
                        <View style={styles.statusRow}>
                            <Text style={[styles.label, { color: theme.textSecondary }]}>Services:</Text>
                            {enabled ? (
                                <View style={styles.badge}>
                                    <Check size={14} color={theme.success} />
                                    <Text style={[styles.value, { color: theme.success }]}>Enabled</Text>
                                </View>
                            ) : (
                                <View style={styles.badge}>
                                    <X size={14} color={theme.error} />
                                    <Text style={[styles.value, { color: theme.error }]}>Disabled</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.statusRow}>
                            <Text style={[styles.label, { color: theme.textSecondary }]}>Permission:</Text>
                            <Text
                                onPress={!isGranted ? requestPermission : undefined}
                                style={[
                                    styles.value,
                                    { color: isGranted ? theme.success : theme.warning, textDecorationLine: !isGranted ? 'underline' : 'none' }
                                ]}
                            >
                                {isGranted ? 'Granted' : 'Request'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        padding: 12,
        backgroundColor: 'rgba(128,128,128,0.1)',
        borderRadius: 12,
    },
    info: {
        flex: 1,
        gap: 4,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.medium,
    },
    value: {
        fontSize: 14,
        fontFamily: Fonts.bold,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    }
});
