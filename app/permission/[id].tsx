import { Card } from '@/components/ui/Card';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePrivacyLogs } from '@/hooks/usePrivacyLogs';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Activity, ArrowLeft, Calendar, Camera, Eye, Image as ImageIcon, MapPin, Mic, ShieldAlert, Users } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PermissionDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const { logs, metrics } = usePrivacyLogs();

    const type = id as string;
    // @ts-ignore: metrics typing is loose in hook
    const metric = metrics[type] || { count24h: 0, accessCount: 0, inUse: false, currentApp: null, accessList: [] };

    // Filter logs for this type
    const typeLogs = logs.filter(l => l.type === type);

    const getIcon = () => {
        const props = { size: 24, color: theme.text };
        switch (type) {
            case 'camera': return <Camera {...props} />;
            case 'microphone': return <Mic {...props} />;
            case 'location': return <MapPin {...props} />;
            case 'contacts': return <Users {...props} />;
            case 'calendar': return <Calendar {...props} />;
            case 'photos': return <ImageIcon {...props} />;
            case 'tracking': return <Eye {...props} />;
            default: return <ShieldAlert {...props} />;
        }
    };

    const getLabel = () => {
        switch (type) {
            case 'camera': return 'Camera';
            case 'microphone': return 'Microphone';
            case 'location': return 'Location';
            case 'contacts': return 'Contacts';
            case 'calendar': return 'Calendar';
            case 'photos': return 'Photos';
            case 'tracking': return 'Tracking';
            default: return 'Permission';
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>{getLabel()}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Main Status Card */}
                <View style={[styles.statusCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <View style={[styles.iconContainer, { backgroundColor: metric.inUse ? theme.error : theme.border }]}>
                        {getIcon()}
                    </View>
                    <View style={styles.statusInfo}>
                        <Text style={[styles.statusLabel, { color: theme.textSecondary }]}>Current Status</Text>
                        {metric.inUse ? (
                            <View style={styles.liveRow}>
                                <Activity size={16} color={theme.error} />
                                <Text style={[styles.statusValue, { color: theme.error }]}>In Use by {metric.currentApp}</Text>
                            </View>
                        ) : (
                            <Text style={[styles.statusValue, { color: theme.text }]}>Idle</Text>
                        )}
                    </View>
                </View>

                {/* 24h History */}
                <Card title="Recent Activity (24h)" subtitle={`${metric.count24h} events recorded`}>
                    {typeLogs.length > 0 ? (
                        typeLogs.map(log => (
                            <View key={log.id} style={[styles.logItem, { borderBottomColor: theme.border }]}>
                                <View style={styles.logLeft}>
                                    <Text style={[styles.appName, { color: theme.text }]}>{log.appName}</Text>
                                    <Text style={[styles.duration, { color: theme.textSecondary }]}>{log.durationSec}s duration</Text>
                                </View>
                                <Text style={[styles.time, { color: theme.textSecondary }]}>
                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: theme.textSecondary, fontStyle: 'italic', padding: 8 }}>No recent activity.</Text>
                    )}
                </Card>

                {/* Access List */}
                <Card title="Apps with Access" subtitle={`${metric.accessCount} apps allowed`}>
                    <View style={styles.accessList}>
                        {(metric.accessList || []).map((app: string, idx: number) => (
                            <View key={idx} style={[styles.accessItem, { backgroundColor: theme.border }]}>
                                <Text style={[styles.accessApp, { color: theme.text }]}>{app}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.bold,
    },
    scrollContent: {
        padding: 16,
        gap: 16,
    },
    statusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        gap: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusInfo: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        marginBottom: 4,
    },
    statusValue: {
        fontSize: 18,
        fontFamily: Fonts.bold,
    },
    liveRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    logItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    logLeft: {
        gap: 2,
    },
    appName: {
        fontSize: 14,
        fontFamily: Fonts.medium,
    },
    duration: {
        fontSize: 12,
    },
    time: {
        fontSize: 12,
        fontFamily: Fonts.mono,
    },
    accessList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    accessItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    },
    accessApp: {
        fontSize: 12,
        fontFamily: Fonts.medium,
    }
});
