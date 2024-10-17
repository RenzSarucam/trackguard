// app/(tabs)/edit-profile.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth } from '../../config/firebaseConfig';

const EditProfile = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser?.uid;
            if (userId) {
                const db = getDatabase();
                const userRef = ref(db, 'users/' + userId);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setFirstName(userData.firstName || '');
                    setLastName(userData.lastName || '');
                    setPhoneNumber(userData.phoneNumber || '');
                    setProfilePic(userData.profilePic || null);
                }
            }
        };
        fetchUserData();
    }, []);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfilePic(result.assets[0].uri);
            handleSave(result.assets[0].uri); // Save the new profile picture immediately
        }
    };

    const handleSave = async (newProfilePic?: string) => {
        const userId = auth.currentUser?.uid; // Get the current user's ID
        if (userId) {
            const db = getDatabase();
            await set(ref(db, 'users/' + userId), {
                firstName,
                lastName,
                phoneNumber,
                profilePic: newProfilePic || profilePic,
            });
            alert("Profile updated successfully.");
        } else {
            alert("User is not authenticated.");
        }
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
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad" // Allow only phone number input
            />
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave()}>
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
        backgroundColor: '#007BFF', // Blue color for the save button
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
