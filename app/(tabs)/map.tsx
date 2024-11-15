import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert, ScrollView } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const DAVAO_CITY_COORDS = {
    latitude: 7.0731,
    longitude: 125.6128,
};
const RADIUS_KM = 10; // 10 km radius around Davao City
const USER_RADIUS_KM = 1; // 1 km radius around user location

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

    useEffect(() => {
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

    const getCurrentLocation = async () => {
        try {
            let { coords } = await Location.getCurrentPositionAsync({});
            const timestamp = new Date().toLocaleString();
            const userLocation = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                timestamp,
            };
            setLocation(userLocation);
            setLocationLogs((prevLogs) => [...prevLogs, userLocation]);
            checkDistanceFromDavao(userLocation);
        } catch (error) {
            console.error('Error fetching location:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkDistanceFromDavao = (userLocation: UserLocation) => {
        const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            DAVAO_CITY_COORDS.latitude,
            DAVAO_CITY_COORDS.longitude
        );

        if (distance > RADIUS_KM) {
            Alert.alert(
                'Out of Range',
                `You have moved out of the 10 km range from Davao City. Current distance: ${distance.toFixed(2)} km`,
                [{ text: 'OK' }]
            );
        }
    };

    const getDistanceFromLatLonInKm = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : location ? (
                <>
                    <MapView
                        provider={PROVIDER_GOOGLE} // Use Google Maps provider
                        style={styles.map}
                        region={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="Current Location"
                            description="Live GPS Location"
                        />
                        <Circle
                            center={DAVAO_CITY_COORDS}
                            radius={RADIUS_KM * 1000} // Convert km to meters
                            strokeColor="rgba(0, 0, 255, 0.5)"
                            fillColor="rgba(0, 0, 255, 0.1)"
                        />
                        <Circle
                            center={location}
                            radius={USER_RADIUS_KM * 1000} // 1 km radius around user location
                            strokeColor="rgba(255, 0, 0, 0.5)"
                            fillColor="rgba(255, 0, 0, 0.1)"
                        />
                    </MapView>
                    <ScrollView style={styles.logContainer}>
                        {locationLogs.map((log, index) => (
                            <View key={index} style={styles.logEntry}>
                                <Text style={styles.logText}>
                                    Location: Lat {log.latitude}, Lon {log.longitude}
                                </Text>
                                <Text style={styles.logText}>Timestamp: {log.timestamp}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </>
            ) : (
                <Text>Location permission denied or unavailable</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '60%',
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
