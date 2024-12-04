import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth } from '../../config/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const EditProfile = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const router = useRouter(); // Get router object from expo-router

    useFocusEffect(
        React.useCallback(() => {
            // Clear input fields and profile picture when the screen is focused
            const resetForm = () => {
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setProfilePic(null);
            };

            resetForm();

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
        }, [])
    );

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfilePic(result.assets[0].uri); // Set the new profile picture
            // No immediate call to handleSave here
        }
    };

    const handleSave = async (newProfilePic?: string) => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const db = getDatabase();
            await set(ref(db, 'users/' + userId), {
                firstName,
                lastName,
                phoneNumber,
                profilePic: newProfilePic || profilePic,
            });

            // Show success alert and navigate to Home after clicking OK
            Alert.alert(
                "Profile Updated",
                "Your profile has been updated successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.push('/home'); // Navigate to Home screen using expo-router
                        },
                    },
                ]
            );

            // Clear input fields after saving
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setProfilePic(null);
        } else {
            Alert.alert("Error", "User is not authenticated.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: '#888888',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 15,
    },
});

export default EditProfile;
