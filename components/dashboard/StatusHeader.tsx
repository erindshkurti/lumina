import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePrivacyLogs } from '@/hooks/usePrivacyLogs'; // New import
import { Audio } from 'expo-av';
import * as Calendar from 'expo-calendar';
import { Camera as ExpoCamera } from 'expo-camera';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { Activity, Calendar as CalIcon, Camera, Eye, Image as ImageIcon, MapPin, Mic, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

type StatusType = 'granted' | 'denied' | 'undetermined' | 'restricted';

export function StatusHeader() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const { metrics } = usePrivacyLogs(); // Get metrics

    const [camStatus, setCamStatus] = useState<StatusType>('undetermined');
    const [micStatus, setMicStatus] = useState<StatusType>('undetermined');
    const [locStatus, setLocStatus] = useState<boolean>(false);
    const [contactsStatus, setContactsStatus] = useState<StatusType>('undetermined');
    const [calendarStatus, setCalendarStatus] = useState<StatusType>('undetermined');
    const [mediaStatus, setMediaStatus] = useState<StatusType>('undetermined');
    const [trackingStatus, setTrackingStatus] = useState<StatusType>('undetermined');

    useEffect(() => {
        async function check() {
            // Camera
            const cam = await ExpoCamera.getCameraPermissionsAsync();
            setCamStatus(cam.status as StatusType);

            // Mic
            const mic = await Audio.getPermissionsAsync();
            setMicStatus(mic.status as StatusType);

            // Location Service (Enabled/Disabled)
            const locEnabled = await Location.hasServicesEnabledAsync();
            setLocStatus(locEnabled);

            // Contacts
            const contacts = await Contacts.getPermissionsAsync();
            setContactsStatus(contacts.status as StatusType);

            // Calendar
            const calendar = await Calendar.getCalendarPermissionsAsync();
            setCalendarStatus(calendar.status as StatusType);

            // Media Library
            const media = await MediaLibrary.getPermissionsAsync();
            setMediaStatus(media.status as StatusType);

            // Tracking (iOS only)
            if (Platform.OS === 'ios') {
                const tracking = await getTrackingPermissionsAsync();
                setTrackingStatus(tracking.status as StatusType);
            }
        }
        check();
    }, []);

    const renderTile = (label: string, icon: React.ReactNode, status: StatusType | boolean, typeKey: string) => {
        // Normalize status
        const isGranted = typeof status === 'boolean' ? status : status === 'granted';

        // Get mock metrics
        const metric = metrics[typeKey] || { count24h: 0, accessCount: 0, inUse: false };
        const inUse = metric.inUse;

        // Visuals
        const bgColor = inUse ? theme.error : (isGranted ? theme.card : theme.card); // Red if in use
        const borderColor = inUse ? theme.error : (isGranted ? theme.border : theme.border);
        const iconColor = inUse ? '#fff' : theme.text;
        const textColor = inUse ? '#fff' : theme.text;
        const secondaryTextColor = inUse ? 'rgba(255,255,255,0.7)' : theme.textSecondary;

        return (
            <View style={[styles.tile, { backgroundColor: bgColor, borderColor: borderColor }]}>
                <View style={styles.header}>
                    <View style={styles.iconRow}>
                        {/* @ts-ignore */}
                        {React.isValidElement(icon) && React.cloneElement(icon, { size: 18, color: iconColor } as any)}
                        <Text style={[styles.label, { color: secondaryTextColor }]}>{label}</Text>
                    </View>
                    {inUse && (
                        <View style={styles.liveBadge}>
                            <Activity size={10} color="#fff" />
                            <Text style={styles.liveText}>LIVE</Text>
                        </View>
                    )}
                </View>

                <View style={styles.statsContainer}>
                    <View>
                        <Text style={[styles.statValue, { color: textColor }]}>{metric.count24h}</Text>
                        <Text style={[styles.statLabel, { color: secondaryTextColor }]}>24h Uses</Text>
                    </View>
                    <View>
                        <Text style={[styles.statValue, { color: textColor }]}>{metric.accessCount}</Text>
                        <Text style={[styles.statLabel, { color: secondaryTextColor }]}>Apps</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderTile('Camera', <Camera />, camStatus, 'camera')}
            {renderTile('Mic', <Mic />, micStatus, 'microphone')}
            {renderTile('Location', <MapPin />, locStatus, 'location')}
            {renderTile('Contacts', <Users />, contactsStatus, 'contacts')}
            {renderTile('Calendar', <CalIcon />, calendarStatus, 'calendar')}
            {renderTile('Photos', <ImageIcon />, mediaStatus, 'photos')}
            {Platform.OS === 'ios' && renderTile('Tracking', <Eye />, trackingStatus, 'tracking')}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    tile: {
        width: '48%',
        aspectRatio: 1.1,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        textTransform: 'uppercase',
        // marginTop: 4, // Removed as it's now in a row
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 100,
        gap: 3,
    },
    liveText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    statValue: {
        fontSize: 20,
        fontFamily: Fonts.bold,
    },
    statLabel: {
        fontSize: 11,
        fontFamily: Fonts.medium,
    }
});
