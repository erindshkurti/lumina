import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

export function useSensors() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        async function checkAvailability() {
            const isAvailable = await Accelerometer.isAvailableAsync();
            setAvailable(isAvailable);
        }

        checkAvailability();

        Accelerometer.setUpdateInterval(500); // 500ms update

        const subscription = Accelerometer.addListener(setData);

        return () => {
            subscription && subscription.remove();
        };
    }, []);

    return { data, available };
}
