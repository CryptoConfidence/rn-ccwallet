import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const AccountHistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header menuAction={() => navigation.toggleDrawer()} />
      <Text> AccountHistoryScreen </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1F3' 
  },
})

export default AccountHistoryScreen;