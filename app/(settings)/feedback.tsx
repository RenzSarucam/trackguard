import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../config/firebaseConfig';

const Feedback = () => {
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState<string | null>(null);
    const router = useRouter();
    const db = getFirestore(); 

    useEffect(() => {
        const fetchUserName = () => {
            const user = auth.currentUser;
            if (user) {
                setUserName(user.displayName || user.email);
            } else {
                setUserName(null);
            }
        };

        fetchUserName();
    }, []);

    const handleSubmit = async () => {
        if (message.trim() === '') {
            Alert.alert('Error', 'Message cannot be empty.');
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                await addDoc(collection(db, 'feedback'), {
                    message,
                    userId: user.uid,
                    userName: user.displayName || user.email,
                    createdAt: new Date()
                });
                Alert.alert('Success', 'Feedback submitted successfully.');
                setMessage('');
                router.push('/home'); // Navigate back to the Profile screen
            } else {
                Alert.alert('Error', 'User is not authenticated.');
            }
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('Error submitting feedback:', errorMessage);
            Alert.alert('Error', `Error submitting feedback: ${errorMessage}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback</Text>
            {userName && <Text style={styles.userName}>Logged in as: {userName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Enter your message"
                value={message}
                onChangeText={setMessage}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userName: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    input: {
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 15,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Feedback;
