import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/futuristic-background.jpg' }} 
      style={styles.container}
    >
      <LinearGradient
        colors={['#1A2D42', '#2E4156', '#AAB7B7']}
        style={styles.gradientOverlay}
      >
        <Image 
          source={require('../assets/images/trackguard.png')} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>Welcome to Track Guard</Text>

        {/* Button to navigate to Login Screen */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            router.push('/(auth)/login');
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 25,
    color: '#D4D8DD',
    marginBottom: 50,
    fontWeight: 'bold',
    textShadowColor: '#2E4156',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 15,
  },
  loginButton: {
    backgroundColor: '#2E4156',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#AAB7B7',
    shadowColor: '#1A2D42',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#C0C8CA',
    fontSize: 22,
    fontWeight: '800',
  },
});
