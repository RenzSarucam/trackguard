import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#083344', '#094155', '#0a4f66']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/trackguard.png')} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>TrackGuard</Text>
        <Text style={styles.descriptionText}>Your trusted companion for secure tracking</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              router.push('/(auth)/login');
            }}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              router.push('/(auth)/signup');
            }}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>
            By continuing, you agree to our{' '}
            <Text style={styles.legalLink}>
              Terms & Conditions
            </Text>
            {' '}and{' '}
            <Text style={styles.legalLink}>
              Privacy Policy
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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  headerText: {
    fontSize: 28,
    color: '#ffffff',  
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#94a3b8',  
    marginBottom: 60,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 60,
  },
  loginButton: {
    backgroundColor: '#155e75',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#155e75',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  legalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 24,
  },
  legalText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
