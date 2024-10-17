import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
    const router = useRouter();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center', // Centers vertically
                alignItems: 'center', // Centers horizontally
                backgroundColor: '#f0f0f0' // Optional: Adds background color
            }}
        >
            {/* Logo Image */}
            <Image
                source={require('../assets/images/trackguard.png')} // Adjust path to your logo
                style={{ width: 100, height: 100, marginBottom: 20 }} // Adjust size and spacing
            />

            {/* Bold TrackGuard */}
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>TrackGuard</Text>

            {/* Login Button */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#1E90FF',
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    marginBottom: 20,
                    width: 200, // Ensures consistent button width
                    alignItems: 'center' // Centers the text inside the button
                }}
                onPress={() => {
                    router.push("/login");
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>Login</Text>
            </TouchableOpacity>

            {/* Signup Button */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#1E90FF',
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    width: 200, // Same width as Login button
                    alignItems: 'center' // Centers the text inside the button
                }}
                onPress={() => {
                    router.push("/signup");
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
}
