// app/(tabs)/home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../../config/firebaseConfig';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>(''); // State for the user's name
    const [locationData, setLocationData] = useState<string>(''); // State for location data
    const router = useRouter();

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
            });

            // Simulate fetching location data (replace this with real data fetching)
            const currentLocation = `Current Location: Lat 12.34, Lon 56.78`;
            const currentDateTime = new Date().toLocaleString();
            setLocationData(`${currentLocation}\nDate and Time: ${currentDateTime}`);
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

            {/* Scrollable Box for Location Data */}
            <View style={styles.messageBox}>
                <ScrollView>
                    <Text style={styles.messageText}>
                        {locationData || "No location data available."}
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
        height: 100,
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
    },
});

export default Home;
