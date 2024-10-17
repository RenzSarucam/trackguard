import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfilePic(result.assets[0].uri);  // Access the first asset's uri
        }
    };

    const handleSave = () => {
        // Handle saving the data here (e.g., API call)
        alert(`Saved: ${firstName} ${middleName} ${lastName}`);
    };

    return (
        <View style={styles.container}>
            {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.profileImage} />
            ) : (
                <Text style={styles.placeholderText}>No Profile Picture Selected</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Change Profile Picture</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Middle Name"
                value={middleName}
                onChangeText={setMiddleName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: '#888888', // Light gray color for the placeholder
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF', // Change this color to your preference
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25, // This makes the button rounded
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007BFF', // Green color for the save button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25, // This makes the button rounded
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%', // Full width input
        marginBottom: 15,
    },
});

export default EditProfile;
