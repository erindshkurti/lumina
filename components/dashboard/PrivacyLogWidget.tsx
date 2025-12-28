import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePrivacyLogs } from '@/hooks/usePrivacyLogs';
import { Camera, Clock, MapPin, Mic } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function PrivacyLogWidget() {
    const { logs } = usePrivacyLogs();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const getIcon = (type: string) => {
        switch (type) {
            case 'camera': return <Camera size={16} color={theme.text} />;
            case 'microphone': return <Mic size={16} color={theme.text} />;
            case 'location': return <MapPin size={16} color={theme.text} />;
            default: return <Clock size={16} color={theme.text} />;
        }
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <Card title="Usage History (Simulation)" subtitle="Recent Access Logs">
            <View style={styles.container}>
                {logs.map((log) => (
                    <View key={log.id} style={[styles.logItem, { borderBottomColor: theme.border }]}>
                        <View style={[styles.iconBox, { backgroundColor: theme.background }]}>
                            {getIcon(log.type)}
                        </View>
                        <View style={styles.details}>
                            <Text style={[styles.appName, { color: theme.text }]}>{log.appName}</Text>
                            <Text style={[styles.type, { color: theme.textSecondary }]}>
                                Accessed {log.type} &bull; {log.durationSec}s
                            </Text>
                        </View>
                        <Text style={[styles.time, { color: theme.textSecondary }]}>
                            {formatTime(log.timestamp)}
                        </Text>
                    </View>
                ))}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 0,
    },
    logItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        gap: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        flex: 1,
    },
    appName: {
        fontSize: 14,
        fontFamily: Fonts.bold,
    },
    type: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        textTransform: 'capitalize',
    },
    time: {
        fontSize: 12,
        fontFamily: Fonts.mono,
    }
});
