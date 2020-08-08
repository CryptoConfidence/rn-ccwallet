import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const DisputeManagementScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header menuAction={() => navigation.toggleDrawer()} />
      <Text> DisputeManagementScreen </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1F3' 
  },
})

export default DisputeManagementScreen;