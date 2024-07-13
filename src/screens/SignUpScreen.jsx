import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({navigation}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track if password and confirm password match
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false); // State to control visibility of password mismatch message

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    checkPasswordConditions(value);
    // Hide error box when typing if passwords match
    if (passwordMatch && showPasswordMismatch) {
      setShowPasswordMismatch(false);
    }
  };

  const checkPasswordConditions = (value) => {
    // Regular expressions for password conditions
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    // Update state based on conditions
    setHasLowerCase(lowerCaseRegex.test(value));
    setHasUpperCase(upperCaseRegex.test(value));
    setHasNumber(numberRegex.test(value));
    setHasSpecialChar(specialCharRegex.test(value));
    setIsMinLength(value.length >= 8);

    // Check password match only if confirm password is not empty
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const checkPasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
    // Hide error box when passwords match
    if (passwordMatch && showPasswordMismatch) {
      setShowPasswordMismatch(false);
    }
  };

  const handleSignUp = () => {
    // Logic for handling signup
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Example navigation to another screen after signup

    auth().createUserWithEmailAndPassword(email.trim(),password)
    .then( cred => {
      const {uid} = cred.user
      auth().currentUser.updateProfile({
        displayName: name
      })
      navigation.navigate('Profile', {
        name: name,
        email: email
      });
    })
    .catch (
      navigation.navigate('Login'),
      err => alert(err.code,err.message)
    )

     // Replace with appropriate navigation route
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyApp</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, !passwordMatch && styles.inputError]}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!passwordVisible}
          onBlur={checkPasswordMatch}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, !passwordMatch && styles.inputError]}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!confirmPasswordVisible}
          onBlur={checkPasswordMatch}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          <Icon name={confirmPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {showPasswordMismatch && !passwordMatch && (
        <View style={styles.passwordMismatchContainer}>
          <Text style={styles.passwordMismatchText}>Password and Confirm Password do not match</Text>
        </View>
      )}

      <View style={styles.conditionsContainer}>
        <View style={styles.conditionColumn}>
          <View style={styles.conditionItem}>
            <Icon name={hasLowerCase ? 'check-circle' : 'circle'} size={20} color={hasLowerCase ? '#00FF00' : '#888'} />
            <Text style={styles.conditionName}>One lowercase character</Text>
          </View>
          <View style={styles.conditionItem}>
            <Icon name={hasUpperCase ? 'check-circle' : 'circle'} size={20} color={hasUpperCase ? '#00FF00' : '#888'} />
            <Text style={styles.conditionName}>One uppercase character</Text>
          </View>
          <View style={styles.conditionItem}>
            <Icon name={hasNumber ? 'check-circle' : 'circle'} size={20} color={hasNumber ? '#00FF00' : '#888'} />
            <Text style={styles.conditionName}>One number</Text>
          </View>
        </View>
        <View style={styles.conditionColumn}>
          <View style={styles.conditionItem}>
            <Icon name={hasSpecialChar ? 'check-circle' : 'circle'} size={20} color={hasSpecialChar ? '#00FF00' : '#888'} />
            <Text style={styles.conditionName}>One special character</Text>
          </View>
          <View style={styles.conditionItem}>
            <Icon name={isMinLength ? 'check-circle' : 'circle'} size={20} color={isMinLength ? '#00FF00' : '#888'} />
            <Text style={styles.conditionName}>8 characters minimum</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>SignUp</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInLink}>SignIn</Text>
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
    marginBottom: 30,
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
  signUpButton: {
    backgroundColor: '#FFD482',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#fff',
  },
  signInLink: {
    color: '#FFD482',
    textDecorationLine: 'underline',
  },
  passwordMismatchContainer: {
    backgroundColor: '#FF3D3D',
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  passwordMismatchText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#FF3D3D',
    borderWidth: 1,
  },
  conditionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between', // Ensure the columns are evenly spaced
  },
  conditionColumn: {
    alignItems: 'flex-start', // Align items to the start of the column
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  conditionName: {
    color: '#fff',
    marginLeft: 5,
  },
})

export default SignUpScreen