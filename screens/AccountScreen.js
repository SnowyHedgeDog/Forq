import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert('Logged out'))
      .catch((error) => alert(error.message));
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not Logged In</Text>
        <Text style={styles.message}>Please log in to view your account.</Text>
        <TouchableOpacity onPress={handleLoginRedirect} style={styles.loginButton}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>User ID: {user.uid}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
  },
  message: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
