import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';

export type BatteryState = {
    level: number | null;
    state: Battery.BatteryState;
    lowPowerMode: boolean;
};

export function useBattery() {
    const [battery, setBattery] = useState<BatteryState>({
        level: null,
        state: Battery.BatteryState.UNKNOWN,
        lowPowerMode: false,
    });

    useEffect(() => {
        let subscription: Battery.Subscription | null = null;
        let modeSubscription: Battery.Subscription | null = null;

        async function init() {
            const [level, state, lowPowerMode] = await Promise.all([
                Battery.getBatteryLevelAsync(),
                Battery.getBatteryStateAsync(),
                Battery.isLowPowerModeEnabledAsync(),
            ]);
            setBattery({ level, state, lowPowerMode });
        }

        init();

        const onLevelChange = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            setBattery((prev) => ({ ...prev, level: batteryLevel }));
        });

        const onStateChange = Battery.addBatteryStateListener(({ batteryState }) => {
            setBattery((prev) => ({ ...prev, state: batteryState }));
        });

        const onLowPowerModeChange = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
            setBattery((prev) => ({ ...prev, lowPowerMode }));
        });

        return () => {
            onLevelChange.remove();
            onStateChange.remove();
            onLowPowerModeChange.remove();
        };
    }, []);

    return battery;
}
