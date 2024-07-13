import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { Icon } from 'react-native-vector-icons/Icon'

const CharacterListScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Icon name="cog" size={30} color="#fff" style={styles.settingsIcon} /> */}
      <View style={styles.content}>
        <Text style={styles.text}>
          Characters list goes here!{"\n"}You are free to come up {"\n"}with a design
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
})

export default CharacterListScreen