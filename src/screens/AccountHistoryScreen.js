import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const AccountHistoryScreen = ({ navigation }) => {
  return (
    <View>
      <Header menuAction={() => navigation.toggleDrawer()} />
      <Text> AccountHistoryScreen </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default AccountHistoryScreen;