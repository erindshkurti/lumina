import { Card } from '@/components/ui/Card';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

export function PermissionTesterWidget() {

    const testCamera = async () => {
        // This will trigger the green dot on iOS/Android
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            Alert.alert("Camera Accessed", "Look for the GREEN dot in your status bar. This confirms the OS is monitoring camera usage.");
        }
    };

    const testMicrophone = async () => {
        // This will trigger the orange dot on iOS/Android
        const { status } = await Audio.requestPermissionsAsync();
        if (status === 'granted') {
            Alert.alert("Microphone Accessed", "Look for the ORANGE dot in your status bar. This confirms the OS is monitoring mic usage.");
        }
    };

    return (
        <Card title="Privacy Self-Check" subtitle="Verify System Indicators">
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button title="Test Camera Access" onPress={testCamera} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Test Mic Access" onPress={testMicrophone} />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    buttonContainer: {
        // Button styling wrapper
    }
});
