import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation, route }) => {

  const { name, email } = route.params;
    
    const handleLogout = () => {
        // Handle logout logic here
        auth().signOut()      

        console.log('Logging out...');
        navigation.navigate('Login');
    };

  return (
    <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>MyApp</Text>
      <View style={styles.displayField}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{ name }</Text>
      </View>
      <View style={styles.displayField}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{ email }</Text>
      </View>
    </View>
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>Log Out</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        justifyContent: 'space-between',
      },
      content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 100,
      },
      displayField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D3D3D',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
      },
      label: {
        color: '#fff',
        marginRight: 10,
        width: 100,
      },
      value: {
        color: '#fff',
        flex: 1,
      },
      logoutButton: {
        backgroundColor: '#FFD482',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
      },
      logoutButtonText: {
        color: '#000',
        fontSize: 16,
      },
})

export default ProfileScreen