import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLocationStatus() {
    const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        async function check() {
            const { status } = await Location.getForegroundPermissionsAsync();
            const isEnabled = await Location.hasServicesEnabledAsync();

            setStatus(status);
            setEnabled(isEnabled);
        }

        check();
    }, []);

    return { status, enabled };
}
