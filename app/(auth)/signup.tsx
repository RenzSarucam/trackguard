import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const SignUp = () => {
    // Define state for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [relativeContactNumber, setRelativeContactNumber] = useState('');

    const router = useRouter(); // Initialize router

    // Handle form submission
    const handleSubmit = () => {
        if (
            !firstName ||
            !lastName ||
            !age ||
            !gender ||
            !address ||
            !contactNumber ||
            !relativeContactNumber
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        // You can perform further validation or data submission here

        Alert.alert('Success', 'Sign-up successful!', [
            {
                text: 'OK',
                onPress: () => router.push('/login'), // Navigate to the Login screen
            },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />

            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />

            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Relative's Contact Number"
                value={relativeContactNumber}
                onChangeText={setRelativeContactNumber}
                keyboardType="phone-pad"
            />

            <Button title="Sign Up" onPress={handleSubmit} />
        </ScrollView>
    );
};

// Styling for the form
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
});

export default SignUp;
