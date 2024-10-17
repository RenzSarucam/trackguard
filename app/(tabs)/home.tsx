import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
    const profileImageUrl = null; // This can be a URL or null if no profile picture is available

    const handleEditProfile = () => {
        // Handle the button press (navigate to edit profile screen, etc.)
        console.log('Edit Profile pressed');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>TrackGuard</Text>
            <View style={styles.profileContainer}>
                <Image
                    source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/images/user.png')} // Use your local default profile image path
                    style={styles.profilePhoto}
                />
                <Text style={styles.subtitle}>Renz Carljansen Sarucam</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Scrollable Box for Prompt Messages */}
            <View style={styles.messageBox}>
                <ScrollView>
                    <Text style={styles.messageText}>
                        This is a prompt message. You can scroll up and down to see more content. Add more text here to fill the space and demonstrate the scrolling functionality. Additional content goes here. Keep adding text to see the scroll effect. Remember, this area is meant for displaying prompts or messages. Continue adding more content to ensure scrolling is visible.
                    </Text>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Align items from the top
        alignItems: 'center', // Center items horizontally
        backgroundColor: '#f8f9fa', // Light background color
        padding: 20, // Add some padding to the container
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30, // Space between title and subtitle
    },
    profileContainer: {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center', // Center items vertically
        marginTop: 20, // Add space above the profile container
        marginBottom: 20, // Space below the profile container
    },
    subtitle: {
        fontSize: 24,
        color: 'black', // Grey color for subtitle
        marginLeft: 10, // Space between profile photo and text
        flexShrink: 1, // Allow text to shrink if it gets too long
        textAlign: 'center', // Center the text if needed
    },
    profilePhoto: {
        width: 100, // Set width of the profile photo
        height: 100, // Set height of the profile photo
        borderRadius: 50, // Make it circular
    },
    button: {
        marginTop: -20, // Adjusted space above the button
        paddingVertical: 10, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        backgroundColor: '#007bff', // Bootstrap primary color
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Center the button text
        width: '60%', // Width of the button
        marginLeft: 100, // Move the button slightly to the right
    },
    buttonText: {
        color: '#ffffff', // White text color
        fontSize: 16, // Font size for the button text
        textAlign: 'center', // Center the text
    },
    messageBox: {
        marginTop: 50, // Space above the message box
        width: '100%', // Full width of the container
        maxHeight: 500, // Maximum height for the message box
        borderWidth: 0, // Border for the message box
        borderColor: '#ccc', // Border color
        borderRadius: 5, // Rounded corners
        padding: 10, // Padding inside the message box
        backgroundColor: '#87CEEB', // Sky blue color for the message box
    },
    messageText: {
        fontSize: 16, // Font size for the message text
        color: '#333', // Dark color for text
        marginBottom: 10, // Space between messages
    },
});

export default Home;
