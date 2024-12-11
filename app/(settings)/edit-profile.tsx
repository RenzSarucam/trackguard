import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth } from '../../config/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const EditProfile = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
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

            Alert.alert(
                "Profile Updated",
                "Your profile has been updated successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.push('/home');
                        },
                    },
                ]
            );

            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setProfilePic(null);
        } else {
            Alert.alert("Error", "User is not authenticated.");
        }
    };

    return (
        <LinearGradient
            colors={['#083344', '#094155', '#0a4f66']}
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Edit Profile</Text>
                    <View style={styles.profileSection}>
                        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                            {profilePic ? (
                                <Image source={{ uri: profilePic }} style={styles.profileImage} />
                            ) : (
                                <Image source={require('../../assets/images/user.png')} style={styles.profileImage} />
                            )}
                            <View style={styles.editIconContainer}>
                                <Ionicons name="camera" size={20} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your first name"
                            placeholderTextColor="#94a3b8"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your last name"
                            placeholderTextColor="#94a3b8"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            placeholderTextColor="#94a3b8"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.saveButton} 
                        onPress={() => handleSave()}
                    >
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 90,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 24,
    },
    profileSection: {
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#155e75',
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#083344',
    },
    emailText: {
        color: '#94a3b8',
        fontSize: 16,
        marginTop: 8,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        color: '#ffffff',
        fontSize: 16,
    },
    buttonContainer: {
        gap: 12,
    },
    saveButton: {
        backgroundColor: '#155e75',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: '#94a3b8',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfile;
