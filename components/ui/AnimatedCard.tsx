import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';

interface AnimatedCardProps {
    children: React.ReactNode;
    index?: number; // For staggered delay
    style?: StyleProp<ViewStyle>;
}

export function AnimatedCard({ children, index = 0, style }: AnimatedCardProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        const delay = index * 100; // 100ms stagger

        opacity.value = withDelay(delay, withTiming(1, {
            duration: 500,
            easing: Easing.out(Easing.cubic)
        }));

        translateY.value = withDelay(delay, withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.cubic)
        }));
    }, [index]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
}
