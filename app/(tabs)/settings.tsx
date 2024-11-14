import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../config/firebaseConfig';

export default function Profile() {
    const router = useRouter();

    const handleFeedback = () => {
        console.log('Feedback clicked');
        router.push('/feedback');
    };

    const handleChangePassword = () => {
        console.log('Change Password clicked');
    };

    const handleLog = () => {
        console.log('Log clicked');
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log('Log Out clicked');
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleEditProfile = () => {
        console.log('Edit Profile clicked');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handleFeedback} style={styles.button}>
                    <Text style={styles.buttonText}>Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLog} style={styles.button}>
                    <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1A2D42',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D4D8DD',
    },
    footer: {
        position: 'absolute',
        bottom: 200,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2E4156',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#C0C8CA',
        fontSize: 16,
    },
});
