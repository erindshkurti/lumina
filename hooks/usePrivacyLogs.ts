import { useEffect, useState } from 'react';

export type PrivacyLogType = 'camera' | 'microphone' | 'location' | 'contacts' | 'calendar' | 'photos' | 'tracking';

export type PrivacyLog = {
    id: string;
    type: PrivacyLogType;
    appName: string;
    timestamp: number; // Date.now()
    durationSec: number;
};

// Mock apps for simulation
const MOCK_APPS = ['Social Gram', 'Map Guide', 'Voice Note', 'Browser', 'Camera App', 'Chat App', 'Fitness Tracker'];
const LOG_TYPES: PrivacyLogType[] = ['camera', 'microphone', 'location', 'contacts', 'calendar', 'photos', 'tracking'];

export function usePrivacyLogs() {
    const [logs, setLogs] = useState<PrivacyLog[]>([]);
    const [metrics, setMetrics] = useState<Record<string, { count24h: number, accessCount: number, inUse: boolean }>>({});

    useEffect(() => {
        // Generate some initial mock history
        const initialLogs: PrivacyLog[] = Array.from({ length: 15 }).map((_, i) => ({
            id: Math.random().toString(36).substr(2, 9),
            type: LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)],
            appName: MOCK_APPS[Math.floor(Math.random() * MOCK_APPS.length)],
            timestamp: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24), // Random time in last 24h
            durationSec: Math.floor(Math.random() * 60) + 5,
        })).sort((a, b) => b.timestamp - a.timestamp);

        setLogs(initialLogs);

        // Calculate mock metrics
        const newMetrics: Record<string, any> = {};
        LOG_TYPES.forEach(type => {
            const inUse = Math.random() > 0.85;
            const accessCount = Math.floor(Math.random() * 15) + 1;

            newMetrics[type] = {
                count24h: initialLogs.filter(l => l.type === type).length,
                accessCount: accessCount,
                inUse: inUse,
                currentApp: inUse ? MOCK_APPS[Math.floor(Math.random() * MOCK_APPS.length)] : null,
                accessList: Array.from({ length: accessCount }).map(() => MOCK_APPS[Math.floor(Math.random() * MOCK_APPS.length)])
            };
        });
        setMetrics(newMetrics);

    }, []);

    return { logs, metrics };
}
