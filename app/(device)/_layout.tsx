import { Stack } from 'expo-router';

export default function DeviceLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="pair" />
            {/* Fallback route */}
            <Stack.Screen name="*" options={{ title: "Not Found" }} />
        </Stack>
    );
}
