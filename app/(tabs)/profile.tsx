import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

export default function Profile() {
    // Handler functions for each button (you can replace these with your navigation logic)
    const handleFeedback = () => {
        // Add navigation logic for feedback
        console.log('Feedback clicked');
    };

    const handleChangePassword = () => {
        // Add navigation logic for changing password
        console.log('Change Password clicked');
    };

    const handleLog = () => {
        // Add navigation logic for log
        console.log('Log clicked');
    };

    const handleLogout = () => {
        // Add navigation logic for logout
        console.log('Log Out clicked');
    };

    const handleEditProfile = () => {
        // Add navigation logic for editing profile
        console.log('Edit Profile clicked');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>This is Profile</Text>
            </View>

            {/* Large Icon */}
            <Icon name="user-circle" size={100} color="#007bff" style={styles.icon} />

            {/* Edit Profile Button */}
            <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

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
        alignItems: 'center',
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
    icon: {
        marginVertical: 20, // Space between icon and edit button
    },
    editButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
