import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerBackVisible: true,
          title: "Log in",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerBackVisible: true,
          title: "Sign Up",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
}
