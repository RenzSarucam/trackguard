import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

export default function Profile() {
    
    const handleFeedback = () => {
        console.log('Feedback clicked');
    };

    const handleChangePassword = () => {
        console.log('Change Password clicked');
    };

    const handleLog = () => {
        console.log('Log clicked');
    };

    const handleLogout = () => {
        console.log('Log Out clicked');
    };

    const handleEditProfile = () => {
        console.log('Edit Profile clicked');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
                {/* You can add an icon here if needed */}
                {/* <Icon name="user" size={50} style={styles.icon} /> */}
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
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center', // Center items horizontally
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        width: '100%', // Take full width
        alignItems: 'center', // Center the title
        marginBottom: 20, // Space between title and icon
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center', // Center the text
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center', // Center the buttons
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%', // Adjust width to make the buttons not full width
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
