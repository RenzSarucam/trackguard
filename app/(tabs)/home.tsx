// app/(tabs)/home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import * as Location from 'expo-location';
import { auth } from '../../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <Text style={styles.title}>TrackGuard</Text>
                    <View style={styles.profileContainer}>
                        <Image
                            source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/images/user.png')}
                            style={styles.profilePhoto}
                        />
                        <Text style={styles.userName}>{userName || "User Name"}</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.emergencyButton]} onPress={handleSendReport}>
                        <Text style={styles.buttonText}>Send Report to Police</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logsContainer}>
                    <Text style={styles.logsTitle}>Location History</Text>
                    <View style={styles.messageBox}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {locationLogs.length > 0 ? (
                                locationLogs.map((log, index) => (
                                    <View key={index} style={styles.logItem}>
                                        <Text style={styles.logText}>
                                            Location: Lat {log.latitude.toFixed(6)}, Lon {log.longitude.toFixed(6)}
                                        </Text>
                                        <Text style={styles.timeText}>{log.timestamp}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.messageText}>No location data available.</Text>
                            )}
                        </ScrollView>
                    </View>
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
        paddingTop: 60,
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
    profileContainer: {
        alignItems: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 12,
    },
    userName: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '600',
    },
    buttonContainer: {
        gap: 16,
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#155e75',
        paddingVertical: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    emergencyButton: {
        backgroundColor: '#dc2626',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    logsContainer: {
        flex: 1,
    },
    logsTitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 12,
        fontWeight: '600',
    },
    messageBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        padding: 16,
        height: 300,
    },
    logItem: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 8,
    },
    logText: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 4,
    },
    timeText: {
        color: '#94a3b8',
        fontSize: 12,
    },
    messageText: {
        color: '#94a3b8',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Home;
