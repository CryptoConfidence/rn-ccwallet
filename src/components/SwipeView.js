import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
 
import Swiper from 'react-native-swiper'


const renderSlides = (accounts) => {
  console.log('Accounts:', accounts)
  if (accounts.length > 0) {
    return (
      accounts.map(account => (
        <View key={account.address} style={styles.slide}>
          <Text style={styles.currency}> {account.currency} </Text>
          <Text style={styles.address}> {account.xAddress} </Text>
          <Text style={styles.balance}> {account.balance} </Text>
        </View>
      ))
    )
  }
  return (
    <View style={styles.slide}>
      <Text style={styles.currency}> - </Text>
      <Text style={styles.address}> Add/Create an account </Text>
      <Text style={styles.balance}> 0.00 </Text>
    </View>
  );
}

const SwipeView = ({ accounts }) => {
  return (
    <Swiper
      key={accounts.address} 
      style={styles.wrapper} 
      showsButtons={true}
    >
      {renderSlides(accounts)}
    </Swiper>
  )
}

const styles = StyleSheet.create ({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  currency: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  address: {
    paddingHorizontal: '18%',
    color: 'black',
    fontSize: 12,
  },
  balance: {
    color: 'black',
    fontSize: 30,
  }
})

export default SwipeView; 