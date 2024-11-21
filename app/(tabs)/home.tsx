// app/(tabs)/home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import * as Location from 'expo-location';
import { auth } from '../../config/firebaseConfig';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>(''); // State for the user's name
    const router = useRouter();
    const [locationLogs, setLocationLogs] = useState<{ latitude: number; longitude: number; timestamp: string; }[]>([]); // Hook for location logs

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        console.log('User ID:', userId); // Debugging log

        // Check if the user is logged in
        if (userId) {
            const db = getDatabase();
            const userRef = ref(db, 'users/' + userId);
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                console.log('User data:', userData);

                if (userData) {
                    setProfileImageUrl(userData.profilePic || null);
                    setUserName(`${userData.firstName} ${userData.lastName}`.trim());
                } else {
                    console.log('User data is incomplete or does not exist.');
                }
            }, {
                onlyOnce: true
            });

            // Get location and update logs
            Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 1 }, (location) => {
                const userLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    timestamp: new Date().toLocaleString(),
                };
                setLocationLogs((prevLogs) => {
                    const updatedLogs = [...prevLogs, userLocation];
                    // Save location data to Firebase
                    if (userId) {
                        const locationRef = ref(db, `users/${userId}/locationLogs`);
                        set(locationRef, updatedLogs).catch((error) => {
                            console.error('Error saving location data to Firebase:', error);
                        });
                    }
                    return updatedLogs;
                });
            });
        } else {
            console.log('User is not authenticated.');
            // Optionally navigate to the login screen if user is not authenticated
            router.push("/(auth)/login");
        }
    }, [router]); // Include router as a dependency

    const handleEditProfile = () => {
        // Navigate to the edit profile screen
        router.push("/edit-profile");
    };

    const handleSendReport = () => {
        Alert.alert('Report Sent', 'Your location has been sent to the police.');
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
51
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>TrackGuard</Text>
            <View style={styles.profileContainer}>
                <Image
                    source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/images/user.png')} // Default image
                    style={styles.profilePhoto}
                />
                <Text style={styles.subtitle}>{userName || "User Name"}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSendReport}>
                <Text style={styles.buttonText}>Send Report to Police</Text>
            </TouchableOpacity>

            {/* Scrollable Box for Location Logs */}
            <View style={styles.messageBox}>
                <ScrollView>
                    {locationLogs.length > 0 ? (
                        locationLogs.map((log: { latitude: number; longitude: number; timestamp: string }, index: number) => (
                            <Text key={index} style={styles.messageText}>
                                Location: Lat {log.latitude}, Lon {log.longitude}
                                {'\n'}Date and Time: {log.timestamp}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.messageText}>No location data available.</Text>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1A2D42',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D4D8DD',
        marginBottom: 30,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 24,
        color: '#D4D8DD',
        marginLeft: 10,
        flexShrink: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button: {
        backgroundColor: '#AAB7B7',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#1A2D42',
        fontSize: 16,
    },
    messageBox: {
        backgroundColor: '#2E4156',
        borderRadius: 8,
        padding: 15,
        width: '100%',
        height: 200,
        marginBottom: 20,
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#C0C8CA',
        marginBottom: 10,
    },
});

export default Home;
