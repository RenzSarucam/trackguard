import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    TextInput,
    Modal,
    Button,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import { auth } from '../../config/firebaseConfig';
import * as Location from 'expo-location';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('User Name');
    const [locationLogs, setLocationLogs] = useState<
        { latitude: number; longitude: number; timestamp: string }[]
    >([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [customMessage, setCustomMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserDataAndStartTracking = async () => {
            const userId = auth.currentUser?.uid;

            if (!userId) {
                Alert.alert('Error', 'You are not logged in. Redirecting to login.');
                router.push('/(auth)/login');
                return;
            }

            const db = getDatabase();
            const userRef = ref(db, `users/${userId}`);

            // Fetch user data
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    setProfileImageUrl(userData.profilePic || null);
                    setUserName(
                        `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
                    );
                }
            });

            // Request location permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Location permissions are required for tracking.'
                );
                return;
            }

            // Track user location
            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 1,
                },
                (location) => {
                    const userLocation = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        timestamp: new Date().toLocaleString(),
                    };

                    setLocationLogs((prevLogs) => {
                        const updatedLogs = [...prevLogs, userLocation];
                        const locationRef = ref(
                            db,
                            `users/${userId}/locationLogs`
                        );
                        set(locationRef, updatedLogs).catch((error) =>
                            console.error('Error saving location:', error)
                        );
                        return updatedLogs;
                    });
                }
            );
        };

        fetchUserDataAndStartTracking();
    }, [router]);

    const handleEditProfile = () => {
        router.push('../device/edit-profile');
    };

    const handleSendReport = () => {
        if (locationLogs.length === 0) {
            Alert.alert('Error', 'No location data available to send.');
            return;
        }

        const db = getDatabase();
        const reportRef = ref(db, 'reports');
        const latestLocation = locationLogs[locationLogs.length - 1];
        const reportData = {
            message: customMessage || 'I need help!',
            location: latestLocation,
            timestamp: new Date().toISOString(),
        };

        push(reportRef, reportData)
            .then(() => {
                Alert.alert('Report Sent', 'Your location has been sent to the police.');
                setCustomMessage('');
                setModalVisible(false);
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to send the report.');
                console.error(error);
            });
    };

    const openReportModal = () => {
        setModalVisible(true);
    };

    const closeReportModal = () => {
        setModalVisible(false);
        setCustomMessage('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={
                        profileImageUrl
                            ? { uri: profileImageUrl }
                            : require('../../assets/images/user.png')
                    }
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{userName}</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={handleEditProfile}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={openReportModal}
                    >
                        <Text style={styles.buttonText}>Report to Police</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.locationLogsBox}>
                <ScrollView>
                    {locationLogs.length > 0 ? (
                        locationLogs.map((log, index) => (
                            <Text key={index} style={styles.locationLogText}>
                                Location: Lat {log.latitude}, Lon {log.longitude}
                                {'\n'}Timestamp: {log.timestamp}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.locationLogText}>
                            No location data available.
                        </Text>
                    )}
                </ScrollView>
            </View>

            {/* Modal for custom message */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Report to Police</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your message"
                            value={customMessage}
                            onChangeText={setCustomMessage}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={closeReportModal} />
                            <Button title="Send" onPress={handleSendReport} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1A2D42',
        paddingTop: 50,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: 300,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    editProfileButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    reportButton: {
        backgroundColor: '#FF5722',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    locationLogsBox: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 15,
        width: '90%',
        marginTop: 20,
        height: 200,
        marginBottom: 20,
    },
    locationLogText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Home;
