import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 7.0920, // Latitude for Sta. Ana, Davao City
                    longitude: 125.6300, // Longitude for Sta. Ana, Davao City
                    latitudeDelta: 0.0922, // Controls zoom level
                    longitudeDelta: 0.0421,
                }}
                mapType="hybrid" // Set map type to hybrid
            >
                {/* Example Marker */}
                <Marker
                    coordinate={{ latitude: 7.0920, longitude: 125.6300 }}
                    title="Sta. Ana"
                    description="Sta. Ana, Davao City"
                />
            </MapView>
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
