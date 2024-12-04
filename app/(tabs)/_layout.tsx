import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Simulate login check (replace with your actual login logic)
        const checkLoginStatus = async () => {
            // For example, check user token or auth state here
            const userLoggedIn = true; // Set based on your logic
            setIsLoggedIn(userLoggedIn);
            if (userLoggedIn) {
                router.push('/device'); // Navigate to 'device' screen if logged in
            }
        };
        checkLoginStatus();
    }, []);

    return (
        <Tabs>
            <Tabs.Screen
                name="device"
                options={{
                    title: 'Device',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="phone-portrait" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
