import React from 'react'
import {View, Text, StyleSheet } from 'react-native';

const PayWithCC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.line1}> Pay with </Text>
        <Text style={styles.line2}> Crypto Confidence </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 60, 
    justifyContent: 'center',
    marginBottom: 80,
  },
  line1: {
    fontSize: 16,
    fontWeight: '200',
    fontStyle: 'italic',
  },
  line2: {
    fontSize: 30,
    fontWeight: '600',
  },
})

export default PayWithCC;
