import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useGoogleAuth } from '../authUtils';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { promptAsync, request } = useGoogleAuth();

  /*const handleLogin = () => {
    alert('Logging in...');
  };*/

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigation.navigate('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo with curved edges */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/ForqLogo.png')}
          style={styles.logo}
        />
      </View>

      {/* Tab switcher (Login/Sign-up) */}
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Login</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.tab}>Sign-up</Text>
        </TouchableOpacity>
      </View>

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

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      
      {/* Google Login UI */}
      <TouchableOpacity
      style={styles.googleBtn}
      onPress={() => alert("Google login available in future versions when we're back from Spain in Aug!!")}
    >
      <View style={styles.googleContent}>
        <Image source={require('../assets/GoogleIcon.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </View>
    </TouchableOpacity>


      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
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
  forgot: {
    color: '#f4511e',
    textAlign: 'right',
    marginVertical: 10
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
  loginBtn: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
