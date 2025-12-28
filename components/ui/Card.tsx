import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    title?: string;
    subtitle?: string;
};

export function Card({ children, style, title, subtitle }: Props) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, style]}>
            {(title || subtitle) && (
                <View style={styles.header}>
                    {title && <Text style={[styles.title, { color: theme.text }]}>{title}</Text>}
                    {subtitle && <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
                </View>
            )}
            <View style={styles.content}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginVertical: 8,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // Elevation for Android
        elevation: 2,
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.bold, // Fallback handled in theme
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    subtitle: {
        fontSize: 13,
        fontFamily: Fonts.medium,
        marginTop: 2,
    },
    content: {
        // Content container
    },
});
