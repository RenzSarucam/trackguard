import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, database } from '../../config/firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

type UserLocation = {
    latitude: number;
    longitude: number;
    timestamp: string;
    radius?: number;
};

export default function MapScreen() {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationLogs, setLocationLogs] = useState<UserLocation[]>([]);
    const [userRadiusMeters, setUserRadiusMeters] = useState<number | null>(null); 
    const [setPoint, setSetPoint] = useState<UserLocation | null>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
                await getCurrentLocation(); 
            } else {
                console.log('Permission to access location was denied');
                setPermissionGranted(false);
                setLoading(false); 
            }
        };

        const userId = auth.currentUser?.uid;
        if (userId) {
            const setPointRef = ref(database, `users/${userId}/setPoint`);
            onValue(setPointRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setSetPoint(data);
                    setUserRadiusMeters(data.radius || 100);
                }
            });
        }

        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (location) {
            const startLocationWatcher = async () => {
                const locationWatcher = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        distanceInterval: 1, 
                    },
                    (newLocation) => {
                        const { latitude, longitude } = newLocation.coords;
                        const timestamp = new Date().toLocaleString();
                        const updatedLocation: UserLocation = { latitude, longitude, timestamp };
                        setLocation(updatedLocation);
                        setLocationLogs((prevLogs) => [...prevLogs, updatedLocation]);
                        checkDistanceFromSetPoint(updatedLocation);
                    }
                );

                return () => {
                    locationWatcher.remove();
                };
            };

            startLocationWatcher();
        }
    }, [location, setPoint, userRadiusMeters]);

    const getCurrentLocation = async () => {
        try {
            let { coords } = await Location.getCurrentPositionAsync({});
            const timestamp = new Date().toLocaleString();
            const userLocation: UserLocation = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                timestamp,
            };
            setLocation(userLocation);
            setLocationLogs((prevLogs) => [...prevLogs, userLocation]);
        } catch (error) {
            console.error('Error fetching location:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkDistanceFromSetPoint = (userLocation: UserLocation) => {
        if (setPoint && userRadiusMeters !== null) {
            const distance = getDistanceFromLatLonInMeters(
                userLocation.latitude,
                userLocation.longitude,
                setPoint.latitude,
                setPoint.longitude
            );

            if (distance > userRadiusMeters) {
                Alert.alert(
                    'Out of Set Point Range',
                    `You have moved out of the ${userRadiusMeters} meters set point radius. Current distance: ${distance.toFixed(2)} meters`,
                    [{ text: 'OK' }]
                );
            }
        }
    };

    const getDistanceFromLatLonInMeters = (
        lat1: number, lon1: number, lat2: number, lon2: number
    ) => {
        const R = 6371000; 
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; 
        return distance;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    const updateSetPoint = (newSetPoint: UserLocation) => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const setPointRef = ref(database, `users/${userId}/setPoint`);
            set(setPointRef, {
                ...newSetPoint,
                radius: userRadiusMeters || 100
            }).catch(error => {
                console.error('Error saving set point:', error);
            });
        }
    };

    const setMapLongPressHandler = () => {
        if (setPoint) {
            setUserRadiusMeters(100);
            updateSetPoint({ ...setPoint, radius: 100 });
            Alert.alert('Set Radius', 'Radius has been set to 100 meters at the chosen point.');
        }
    };

    const handleViewLogs = () => {
        if (locationLogs.length === 0) {
            Alert.alert('No Logs', 'There are no location logs available.');
        } else {
            const logDetails = locationLogs
                .map((log, index) => `Log ${index + 1}: Latitude: ${log.latitude}, Longitude: ${log.longitude}, Timestamp: ${log.timestamp}`)
                .join('\n\n');
            Alert.alert('Location Logs', logDetails);
        }
    };

    return (
        <LinearGradient
            colors={['#083344', '#094155', '#0a4f66']}
            style={styles.container}
        >
            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
            ) : location ? (
                <View style={styles.content}>
                    
                    <View style={styles.mapContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onLongPress={(e: any) => {
                                const { latitude, longitude } = e.nativeEvent.coordinate;
                                const newSetPoint = { 
                                    latitude, 
                                    longitude, 
                                    timestamp: new Date().toLocaleString() 
                                };
                                setSetPoint(newSetPoint);
                                updateSetPoint(newSetPoint);
                                Alert.alert('Set Point', 'A new set point has been created.');
                            }}>
                            {setPoint && (
                                <Marker
                                    coordinate={{
                                        latitude: setPoint.latitude,
                                        longitude: setPoint.longitude,
                                    }}
                                    title="Set Point"
                                    description="Custom set point location"
                                />
                            )}
                            {setPoint && userRadiusMeters && (
                                <Circle
                                    center={{
                                        latitude: setPoint.latitude,
                                        longitude: setPoint.longitude,
                                    }}
                                    radius={userRadiusMeters}
                                    strokeColor="rgba(255, 0, 0, 0.5)"
                                    fillColor="rgba(255, 0, 0, 0.1)"
                                />
                            )}
                        </MapView>
                    </View>

                    <View style={styles.controlsContainer}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => setMapLongPressHandler()}
                        >
                            <Text style={styles.buttonText}>Set Radius to 100 Meters</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleViewLogs}
                        >
                            <Text style={styles.buttonText}>View Location History</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Location permission denied or unavailable</Text>
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
    },
    mapContainer: {
        height: '70%',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 24,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    controlsContainer: {
        gap: 16,
    },
    button: {
        backgroundColor: '#155e75',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});
