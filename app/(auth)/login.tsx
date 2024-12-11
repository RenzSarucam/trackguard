import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#083344', '#094155', '#0a4f66']}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, isLoading && styles.inputDisabled]}
                        placeholder="Email"
                        placeholderTextColor="#94a3b8"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        editable={!isLoading}
                    />

                    <TextInput
                        style={[styles.input, isLoading && styles.inputDisabled]}
                        placeholder="Password"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        editable={!isLoading}
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#ffffff" />
                            <Text style={styles.loadingText}>Logging in...</Text>
                        </View>
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                        Don't have an account?{' '}
                        <Text 
                            style={[styles.signupLink, isLoading && styles.linkDisabled]}
                            onPress={() => !isLoading && router.push('/signup')}
                        >
                            Sign up
                        </Text>
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        gap: 16,
        marginBottom: 24,
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#155e75',
        paddingVertical: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    signupContainer: {
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
    },
    signupText: {
        color: '#94a3b8',
        fontSize: 16,
    },
    signupLink: {
        color: '#ffffff',
        textDecorationLine: 'underline',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    inputDisabled: {
        opacity: 0.7,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    linkDisabled: {
        opacity: 0.7,
    },
});
