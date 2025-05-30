// screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*const handleSignUp = () => {
    alert('Signing up...');
  };*/

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign-up successful!");
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/ForqLogo.png')}
          style={styles.logo}
        />
      </View>

      {/* Tab switcher (Login/Sign-up) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.tab}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.tab, styles.activeTab]}>Sign-up</Text>
      </View>

      {/* Name Input */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Daniel Wu"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="DanielWu@gmail.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

    {/* Sign Up Button */}
    <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
      <Text style={styles.signUpText}>Sign Up</Text>
    </TouchableOpacity>

    {/* OR separator */}
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorText}>or</Text>
      <View style={styles.separatorLine} />
    </View>

    {/* Google Sign-Up */}
    <TouchableOpacity style={styles.googleBtn}
        onPress={() => alert("Google login available in future versions when we're back from Spain in Aug!!")}>
      <View style={styles.googleContent}>
        <Image
          source={require('../assets/GoogleIcon.png')}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </View>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff'
  },
  logoWrapper: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    resizeMode: 'contain'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 20,
    color: '#999'
  },
  activeTab: {
    color: '#f4511e',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#f4511e'
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    color: '#444'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16
  },
  googleBtn: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  googleText: {
    color: '#333',
    fontSize: 16,
  },
  signUpBtn: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc'
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14
  }
});
