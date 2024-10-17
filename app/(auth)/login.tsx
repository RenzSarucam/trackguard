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
                    Alert.alert('Login Error', error.message);
                }
            } else if (error instanceof Error) {
                Alert.alert('Login Error', error.message);
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
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none" 
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress = {() => router.push('/home')}>
                <Text style={styles.buttonText}>Login Test</Text>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    signupLink: {
        marginTop: 20,
    },
    signupText: {
        color: '#1E90FF',
        fontSize: 14,
    },
});
