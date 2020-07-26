import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const DisputeManagementScreen = ({ navigation }) => {
  return (
    <View>
      <Header menuAction={() => navigation.toggleDrawer()} />
      <Text> DisputeManagementScreen </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default DisputeManagementScreen;