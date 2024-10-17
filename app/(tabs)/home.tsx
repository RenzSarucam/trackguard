import React, { useRef } from 'react';
import { View, Text, Image, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
    const animation = useRef(new Animated.Value(1)).current;
    const router = useRouter(); // Initialize the router

    const heartBeat = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1.2,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: 10 }
        ).start();
    };

    const scaleStyle = {
        transform: [{ scale: animation }],
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
            {/* Header section */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start', marginBottom: 0 }}>
                    TrackGuard
                </Text>

                {/* Profile icon in upper right */}
                <TouchableOpacity onPress={() => router.push('/profile')}>
                    <Image
                        source={require('../../assets/images/user.png')} // Use your profile icon here
                        style={{ width: 40, height: 40, borderRadius: 10 }} // Circular profile icon
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={heartBeat}>
                    <Animated.View style={scaleStyle}>
                        <Image
                            source={require('../../assets/images/loading.gif')}
                            style={{ width: 250, height: 250 }}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ marginTop: 60, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1e90ff',
                        paddingVertical: 10,
                        paddingHorizontal: 40,
                        borderRadius: 50,
                        marginBottom: 20,
                        width: '70%',
                        alignItems: 'center',
                    }}
                    onPress={() => console.log('Location pressed')} // Change this to navigate if needed
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#1e90ff',
                        paddingVertical: 10,
                        paddingHorizontal: 40,
                        borderRadius: 50,
                        width: '70%',
                        alignItems: 'center',
                    }}
                    onPress={() => router.push('/map')} // Use router to navigate to map
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>View Map</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
