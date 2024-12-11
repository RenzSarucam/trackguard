import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert, ScrollView, Button } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

type UserLocation = {
    latitude: number;
    longitude: number;
    timestamp: string;
};

export default function MapScreen() {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationLogs, setLocationLogs] = useState<UserLocation[]>([]);
    const [userRadiusMeters, setUserRadiusMeters] = useState<number | null>(null); // Customizable radius for user location
    const [setPoint, setSetPoint] = useState<UserLocation | null>(null); // Set point for the 100 meters radius

    useEffect(() => {const firebaseConfig = {
  apiKey: "AIzaSyBn9m8VH43GFrlIHN1dgBmlY-3BgdwjCDs",
  authDomain: "track-guard.firebaseapp.com",
  databaseURL: "https://track-guard-default-rtdb.firebaseio.com",
  projectId: "track-guard",
  storageBucket: "track-guard.firebasestorage.app",
  messagingSenderId: "1024269638309",
  appId: "1:1024269638309:web:6aea15e6899d7ea5388b4c"
};
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
                await getCurrentLocation(); // Retrieve the initial location if permission is granted
            } else {
                console.log('Permission to access location was denied');
                setPermissionGranted(false);
                setLoading(false); // Stop loading if permissions are denied
            }
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (location) {
            const startLocationWatcher = async () => {
                const locationWatcher = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        distanceInterval: 1, // Check for every 1 meter change
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
        const R = 6371000; // Radius of the earth in meters
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in meters
        return distance;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    const setMapLongPressHandler = () => {
        if (setPoint) {
            setUserRadiusMeters(100);
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
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : location ? (
                <>
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
                            setSetPoint({ latitude, longitude, timestamp: new Date().toLocaleString() });
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
                    <ScrollView style={styles.logContainer}>
                        <View style={styles.buttonContainer}>
                            <Button title="Set Radius to 100 Meters" onPress={() => setMapLongPressHandler()} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="View All Logs" onPress={handleViewLogs} />
                        </View>
                    </ScrollView>
                </>
            ) : (
                <Text>Location permission denied or unavailable</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '80%',
    },
    logContainer: {
        width: '100%',
        height: '40%',
        backgroundColor: '#2E4156',
        padding: 10,
    },
    logEntry: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#1A2D42',
        borderRadius: 8,
    },
    logText: {
        color: '#C0C8CA',
        fontSize: 14,
    },
});
