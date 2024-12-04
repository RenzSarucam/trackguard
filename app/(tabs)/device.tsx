import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function DeviceScreen() {
    const router = useRouter();

    const handlePairing = () => {
        console.log('Feedback clicked');
        router.push('/pair');
    };

    return (
        
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://example.com/device-icon.png' }} // Replace with your device icon URL
                style={styles.deviceIcon}
            />
            <Text style={styles.title}>Pair Your Device</Text>
            <Text style={styles.description}>
                Ensure your device is powered on and nearby. Follow the instructions below to start pairing.
            </Text>
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            <TouchableOpacity style={styles.button} onPress={handlePairing}>
                <Text style={styles.buttonText}>Start Pairing</Text>
            </TouchableOpacity>
        </View>
           
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    deviceIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    loader: {
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
