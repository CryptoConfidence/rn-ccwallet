import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { reloadLocalAccounts } from '../redux/AccountActions';
import { xrplAccountSubscribe } from '../subscribers/AccountSubscribers';
import { ledgerConnect } from '../redux/XRPActions';


const LoadingScreen = ({ navigation, reloadLocalAccounts, ledgerConnect  }) => {

  const [isLoaded, setIsLoaded] = useState(false);

  const tryReloadLocalAccounts = async () => {
    try {
      await reloadLocalAccounts() // This gets the known accounts from persisted storage
      xrplAccountSubscribe() // This gets the latest info for those accounts and starts the subscribers
      setIsLoaded(true)
    } catch (error) {
      console.log('Loading error',error)
    }
    
  }

  useEffect(() => {
    console.log('Connecting to RippleAPI')
    ledgerConnect()
    console.log('Loading Accounts')
    tryReloadLocalAccounts()   
  }, [])

  useEffect(() => {
    console.log('Is Loaded=', isLoaded)
    console.log('Navigation:', navigation)
    if (isLoaded) {
      navigation.navigate('ViewFunds')
    }  
  }, [isLoaded])
  
  return (
    <View style={styles.container}> 
      <Text> Loading.... </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF1F3'
  }
})



export default connect(null, { reloadLocalAccounts, ledgerConnect })(LoadingScreen);