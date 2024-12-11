import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [relativeContactNumber, setRelativeContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        if (
            !firstName ||
            !lastName ||
            !age ||
            !gender ||
            !address ||
            !contactNumber ||
            !relativeContactNumber ||
            !email ||
            !password
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                age,
                gender,
                address,
                contactNumber,
                relativeContactNumber,
                email,
            });

            Alert.alert('Success', 'Sign-up successful!', [
                {
                    text: 'OK',
                    onPress: () => router.push('/login'),
                },
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#083344', '#094155', '#0a4f66']}
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Fill in your details to get started</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            placeholderTextColor="#94a3b8"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor="#94a3b8"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Age"
                            placeholderTextColor="#94a3b8"
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Gender"
                            placeholderTextColor="#94a3b8"
                            value={gender}
                            onChangeText={setGender}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        placeholderTextColor="#94a3b8"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        placeholderTextColor="#94a3b8"
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Relative's Contact Number"
                        placeholderTextColor="#94a3b8"
                        value={relativeContactNumber}
                        onChangeText={setRelativeContactNumber}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#94a3b8"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />
                ) : (
                    <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        Already have an account?{' '}
                        <Text 
                            style={styles.loginLink}
                            onPress={() => router.push('/login')}
                        >
                            Login
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 100,
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
    inputGroup: {
        flexDirection: 'row',
        gap: 16,
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
    },
    signupButton: {
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
    loadingIndicator: {
        marginVertical: 20,
    },
    loginContainer: {
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
    },
    loginText: {
        color: '#94a3b8',
        fontSize: 16,
    },
    loginLink: {
        color: '#ffffff',
        textDecorationLine: 'underline',
    },
});

export default SignUp;
