import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const handleLogin = () => {
    // Logic for handling login
    console.log('Email:', email);
    console.log('Password:', password);

    auth().signInWithEmailAndPassword(email.trim(), password)
    .then(() => {
      console.log(auth().currentUser.uid)

      navigation.navigate('Profile', {
        name: 'Jhon Doe',
        email: email
      });
    })
    .catch (
      navigation.navigate('Login'),
      err => alert(err.code,err.message),
    )

    // Example navigation to another screen after login
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyApp</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.forgetContainer}>
        <TouchableOpacity onPress={() => console.log('Forgot Password pressed')}>
          <Text style={styles.forgetPasswordText}>Forget password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>SignIn</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Text style={styles.signUpLink}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 70,
  },
  input: {
    backgroundColor: '#3D3D3D',
    color: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D3D3D',
    borderRadius: 15,
    marginBottom: 10,
    paddingLeft: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  signInButton: {
    backgroundColor: '#FFD482',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#000',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#fff',
  },
  signUpLink: {
    color: '#FFD482',
    textDecorationLine: 'underline',
  },
  forgetContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    justifyContent: 'flex-end', // Aligns content to the right
  },
  forgetPasswordText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})

export default LoginScreen