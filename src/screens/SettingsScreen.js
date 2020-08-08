import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header menuAction={() => navigation.toggleDrawer()} />
      <Text> SettingsScreen </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1F3' 
  },
})

export default SettingsScreen;