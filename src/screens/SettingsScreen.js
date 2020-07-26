import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const SettingsScreen = ({ navigation }) => {
  return (
    <View>
      <Header menuAction={() => navigation.toggleDrawer()} />
      <Text> SettingsScreen </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SettingsScreen;