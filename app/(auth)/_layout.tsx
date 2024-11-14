import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{ headerBackVisible: false }} // Set headerBackVisible to false
            />
            <Stack.Screen
                name="signup"
            />
        </Stack>
    );
}
