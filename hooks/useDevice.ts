import * as Device from 'expo-device';
import { useEffect, useState } from 'react';

export type DeviceInfo = {
    modelName: string | null;
    osName: string | null;
    osVersion: string | null;
    brand: string | null;
    manufacturer: string | null;
    designName: string | null;
    productName: string | null;
    totalMemory: number | null;
    isDevice: boolean;
};

export function useDeviceInfo() {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        modelName: null,
        osName: null,
        osVersion: null,
        brand: null,
        manufacturer: null,
        designName: null,
        productName: null,
        totalMemory: null,
        isDevice: true,
    });

    useEffect(() => {
        function init() {
            setDeviceInfo({
                modelName: Device.modelName,
                osName: Device.osName,
                osVersion: Device.osVersion,
                brand: Device.brand,
                manufacturer: Device.manufacturer,
                designName: Device.designName,
                productName: Device.productName,
                totalMemory: Device.totalMemory,
                isDevice: Device.isDevice,
            });
        }

        init();
    }, []);

    return deviceInfo;
}
