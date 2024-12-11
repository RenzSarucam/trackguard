import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, database } from '../../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { ref, onValue } from 'firebase/database';

type UserData = {
    firstName: string;
    lastName: string;
    profilePic: string | null;
    email: string;
};

export default function Settings() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const userRef = ref(database, `users/${userId}`);
            const unsubscribe = onValue(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserData({
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        profilePic: data.profilePic || null,
                        email: auth.currentUser?.email || ''
                    });
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, []);

    const menuItems: { icon: 'person-outline' | 'key-outline' | 'document-text-outline' | 'chatbox-outline', title: string, onPress: () => void }[] = [
        {
            icon: 'person-outline',
            title: 'Edit Profile',
            onPress: () => router.push("/edit-profile"),
        },
        {
            icon: 'key-outline',
            title: 'Change Password',
            onPress: () => router.push("/(settings)change-password"),
        },
        {
            icon: 'document-text-outline',
            title: 'History',
            onPress: () => router.push("/"),
        },
        {
            icon: 'chatbox-outline',
            title: 'Feedback',
            onPress: () => router.push("/feedback"),
        },
    ];

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <LinearGradient
            colors={['#083344', '#094155', '#0a4f66']}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                    <View style={styles.profileSection}>
                        {userData?.profilePic ? (
                            <Image
                                source={{ uri: userData.profilePic }}
                                style={styles.profilePhoto}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/images/user.png')}
                                style={styles.profilePhoto}
                            />
                        )}
                        <Text style={styles.userName}>
                            {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
                        </Text>
                        <Text style={styles.userEmail}>
                            {userData?.email || 'Loading...'}
                        </Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={item.onPress}
                        >
                            <Ionicons name={item.icon} size={24} color="#ffffff" />
                            <Text style={styles.menuItemText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 24,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 12,
    },
    userName: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#94a3b8',
        fontWeight: '400',
    },
    menuContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    menuItemText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc2626',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    logoutText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});
