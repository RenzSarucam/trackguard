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
                    headerTitleStyle: { color: "black" },
                    headerTintColor: "black",
                }}
            />
        </Stack>
    );
}
