import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import * as Location from 'expo-location';
import { auth } from '../../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('User'); // Default username
    const router = useRouter();
    const [locationLogs, setLocationLogs] = useState<{ latitude: number; longitude: number; timestamp: string; }[]>([]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            router.push("/(auth)/login");
            return;
        }

        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);

        // Listen to user data changes
        const unsubscribeUser = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setProfileImageUrl(userData.profilePic || null);
                setUserName(`${userData.firstName} ${userData.lastName}`.trim());
                setLocationLogs(userData.locationLogs || []); // Load existing location logs
            }
        });

        // Location tracking setup
        let locationWatcher: Location.LocationSubscription | null = null;
        const setupLocationWatcher = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Location access is required.");
                return;
            }

            locationWatcher = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 1
                },
                (location) => {
                    const newLog = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        timestamp: new Date().toLocaleString(),
                    };

                    setLocationLogs((prevLogs) => {
                        const updatedLogs = [...prevLogs, newLog];
                        const locationRef = ref(db, `users/${userId}/locationLogs`);
                        set(locationRef, updatedLogs).catch(console.error);
                        return updatedLogs;
                    });
                }
            );
        };

        setupLocationWatcher();

        return () => {
            unsubscribeUser();
            if (locationWatcher) locationWatcher.remove();
        };
    }, [router]);

    const handleEditProfile = () => router.push("/edit-profile");

    const handleSendReport = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            Alert.alert('Error', 'User not authenticated. Please log in.');
            router.push("/(auth)/login");
            return;
        }

        const db = getDatabase();
        const reportRef = ref(db, `reports/${userId}/${Date.now()}`);

        try {
            const lastLog = locationLogs[locationLogs.length - 1];
            if (!lastLog) {
                Alert.alert('Error', 'No location data available to send.');
                return;
            }

            const reportData = {
                reportId: `${userId}_${Date.now()}`,
                userId,
                location: {
                    latitude: lastLog.latitude,
                    longitude: lastLog.longitude,
                },
                timestamp: new Date().toISOString(),
                message: "Emergency report sent.",
            };

            await set(reportRef, reportData);
            Alert.alert('Report Sent', 'Your location has been sent to the authorities.');
        } catch (error) {
            Alert.alert('Error', 'Failed to send report.');
            console.error(error);
        }
    };

    return (
        <LinearGradient colors={['#083344', '#094155', '#0a4f66']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>TrackGuard</Text>
                    <View style={styles.profileContainer}>
                        <Image
                            source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/images/user.png')}
                            style={styles.profilePhoto}
                        />
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.emergencyButton]} onPress={handleSendReport}>
                        <Text style={styles.buttonText}>Send Report</Text>
                    </TouchableOpacity>
                </View>

                {/* Location History Section */}
                <View style={styles.logsContainer}>
                    <Text style={styles.logsTitle}>Location History</Text>
                    <ScrollView style={styles.logsList}>
                        {locationLogs.length > 0 ? (
                            locationLogs.map((log, index) => (
                                <View key={index} style={styles.logItem}>
                                    <Text style={styles.logText}>
                                        Latitude: {log.latitude.toFixed(6)}, Longitude: {log.longitude.toFixed(6)}
                                    </Text>
                                    <Text style={styles.timestamp}>{log.timestamp}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noLogsText}>No location history available.</Text>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flexGrow: 1, paddingHorizontal: 25, paddingVertical: 40 },
    header: { alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 40, color: '#ffffff', fontWeight: '600' },
    profileContainer: { alignItems: 'center' },
    profilePhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 20          },
    userName: { fontSize: 20, color: '#ffffff' },
    buttonContainer: { gap: 16 },
    button: { backgroundColor: '#155e75', padding: 16, borderRadius: 12, alignItems: 'center' },
    emergencyButton: { backgroundColor: '#dc2626' },
    buttonText: { color: '#ffffff', fontWeight: '600' },
    logsContainer: { marginTop: 32 },
    logsTitle: { fontSize: 18, color: '#ffffff', marginBottom: 12 },
    logsList: { maxHeight: 300 },
    logItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    logText: { fontSize: 14, color: '#ffffff' },
    timestamp: { fontSize: 12, color: '#a9a9a9' },
    noLogsText: { fontSize: 14, color: '#ffffff', textAlign: 'center' },
});

export default Home;
