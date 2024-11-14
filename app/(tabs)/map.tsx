import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { database } from '../../config/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import * as Location from 'expo-location';

type UserLocation = {
    latitude: number;
    longitude: number;
};

export default function MapScreen() {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
            } else {
                console.log('Permission to access location was denied');
            }
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (permissionGranted) {
            const gpsRef = ref(database, 'gps'); // Ensure this matches Arduino Firebase URL path
            const unsubscribe = onValue(gpsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const { latitude, longitude } = data;
                    setLocation({ latitude, longitude });
                }
            });

            return () => unsubscribe();
        }
    }, [permissionGranted]);

    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    provider="google"
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        title="Current Location"
                        description="Live GPS Location"
                    />
                </MapView>
            ) : (
                <Text>Loading map...</Text>
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
        height: '100%',
    },
});
