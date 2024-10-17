import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons

export default function TabsLayout() {
    return (
        <>
            <Tabs>
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
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
