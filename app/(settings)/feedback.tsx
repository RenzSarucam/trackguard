import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

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
                router.push('/home'); 
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
        <LinearGradient
            colors={['#083344', '#094155', '#0a4f66']}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Feedback</Text>
                    {userName && <Text style={styles.userName}>Logged in as: {userName}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your feedback message"
                        placeholderTextColor="#94a3b8"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit Feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 100,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
    },
    userName: {
        fontSize: 16,
        color: '#94a3b8',
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 32,
    },
    input: {
        height: 200,
        padding: 16,
        color: '#ffffff',
        fontSize: 16,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        gap: 16,
    },
    button: {
        backgroundColor: '#155e75',
        paddingVertical: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Feedback;
