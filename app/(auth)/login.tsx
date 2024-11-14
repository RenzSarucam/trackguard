import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { FirebaseError } from 'firebase/app';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/home");
        } catch (error) {
            console.error(error);

            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('Login Error', 'No user found with this email. Please sign up first.');
                } else if (error.code === 'auth/wrong-password') {
                    Alert.alert('Login Error', 'Incorrect password. Please try again.');
                } else {
                    Alert.alert('Login Error', "The password or email you’ve entered is incorrect.");
                }
            } else if (error instanceof Error) {
                Alert.alert('Login Error', "The password or email you’ve entered is incorrect.");
            } else {
                Alert.alert('Login Error', 'An unknown error occurred.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#AAB7B7"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none" 
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#AAB7B7"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupLink} onPress={() => router.push('/signup')}>
                <Text style={styles.signupText}>Don't have an account? Sign up here</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1A2D42',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#D4D8DD',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#2E4156',
        backgroundColor: '#2E4156',
        color: '#D4D8DD',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#AAB7B7',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#1A2D42',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupLink: {
        marginTop: 20,
    },
    signupText: {
        color: '#C0C8CA',
        fontSize: 16,
    },
});
