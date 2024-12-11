import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="edit-profile"
                options={{
                    title: "Edit Profile",
                    headerShown: true,
                    headerTransparent: true,
                    headerTitleStyle: { color: "white" },
                    headerTintColor: "white",
                }}
            />
             <Stack.Screen
                name="change-password"
                options={{
                    title: "Change Password",
                    headerShown: true,
                    headerTransparent: true,
                    headerTitleStyle: { color: "white" },
                    headerTintColor: "white",
                }}
            />
              <Stack.Screen
                name="feedback"
                options={{
                    title: "Feedback",
                    headerShown: true,
                    headerTransparent: true,
                    headerTitleStyle: { color: "white" },
                    headerTintColor: "white",
                }}
            />
        </Stack>
    );
}
