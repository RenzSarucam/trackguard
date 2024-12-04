import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PairScreen() {
    const router = useRouter();

    const handleGoBack = () => {
        // Navigate back to the previous screen
        router.back();
    };

    const handleNavigateHome = () => {
        // Navigate to the home screen
        router.push("/(tabs)/home");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Pairing Screen!</Text>

            {/* Button to go back to the previous screen */}
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>

            {/* Button to navigate to the Home screen */}
            <TouchableOpacity style={styles.button} onPress={handleNavigateHome}>
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
