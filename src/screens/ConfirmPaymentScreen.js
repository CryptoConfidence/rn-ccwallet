import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { Dropdown } from 'react-native-material-dropdown-v2';
import RNPickerSelect from 'react-native-picker-select';
import { sendBasicXrpPayment } from '../ledger/BasicPayment';
import { sendEscrowXrpPayment } from '../ledger/EscrowPayment';

const ConfirmPaymentScreen = ( { navigation, paymentDetails, accounts, connectionStatus, price } ) => {
//const ConfirmPaymentScreen = ( { navigation, paymentDetails, accounts, connectionStatus } ) => {
  
  const [accountSelected, setAccountSelected] = useState('');

  //const price = 0.2804
  const xrpAmount = paymentDetails.Amount / price / 100;
  //const xrpAmount = 15;  // Override XRP amount for testing purposes
  const accountNames = accounts.map(account => {
    if (account) {
      return { 
        label: `${account.name}      ${account.balance} XRP`, 
        value: account.xAddress,
        key: account.xAddress 
      } 
    } else {
      return null
    }  
  })
  
  const mapAddressToAccount = (xAddress) => {
    const accSelected = accounts.filter(account => account.xAddress === xAddress)
    console.log('Account Selected:', accSelected[0]);
    setAccountSelected(accSelected[0]);
  } 

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}> 
          <TouchableOpacity style={styles.touchable}
            onPress={() => console.log(navigation.navigate('Barcode'))}
          >
            <Icon name="chevron-left" style={styles.goback} />
          </TouchableOpacity>
          <Text style={styles.headertext}> Payment Details </Text>
          { connectionStatus ?
            <Icon name="circle" style={[styles.connected, styles.icon]} />
            :
            <Icon name="circle" style={[styles.disconnected, styles.icon]} />
          }
        </View>

        <View style={styles.paymentDetails}>
          <View style={styles.recipient}>
            <Text> Recipient: {paymentDetails.Vendor} </Text>
          </View>

          <Text> USD Amount: ${paymentDetails.Amount} </Text>
          <Text> XRP Price: ${price} </Text>
          <Text> XRP Amount: {xrpAmount.toFixed(4)} XRP </Text>
        </View>
      
        <View style={styles.dropdown_container}>
          <RNPickerSelect
            style={styles.dropdown}
            //label='Select Account'
            //fontSize={12}
            //labelFontSize={10}
            //animationDuration={50}
            placeholder={{ label: 'Select an Account...' }}
            items={accountNames}
            onValueChange={(text) => {mapAddressToAccount(text)}}
          />
        </View>
        

        <View style={styles.selected}>
          <Text style={styles.selectedTitle}> Account Selected: </Text>
          <Text style={styles.selectedValue} > {accountSelected.xAddress}  </Text>
        </View>
        
      </View>

      <View style={styles.footer}>
        { !connectionStatus ?
          <View style={styles.error_container}>
            <Text style={styles.error}> You are not currently able to make a payment: </Text>
            <Text style={styles.error}> Please check your network connectivity </Text>
          </View>
          :
          null
        }
        { accountSelected !== null && accountSelected.balance < xrpAmount ?
          <View style={styles.error_container}>
            <Text style={styles.error}> You do not have enough funds to make this payment: </Text> 
            <Text style={styles.error}> Please select another account </Text>
          </View>
          :
          null
        }

        <View style={styles.buttons}>
          <Button title='Make Secure Payment' onPress={() => {
            sendEscrowXrpPayment(accountSelected, paymentDetails.Address, xrpAmount.toFixed(6), paymentDetails.Condition)
            navigation.navigate('Tracker')
          }} /> 
          <Button color='black' title='Make Regular Payment' onPress={() => {
            sendBasicXrpPayment(accountSelected, paymentDetails.Address, xrpAmount.toFixed(6))
            navigation.navigate('Tracker')
          }} /> 
        </View>
      </View>
      
          
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EBF1F3' 
  },
  main: {

  },
  header: {
    paddingVertical: 10,
    padding: 5,
    flexDirection: 'row'
  },
  touchable: {
    width: '15%'
  },
  goback: {
    fontSize: 25
  },
  headertext: {
    flex: 1,
    width: '70%',
    fontSize: 18,
    fontWeight: '700'
  },
  icon: {
    fontSize: 24,
    paddingRight: 5
  },
  connected: {
    color: 'green'
  },
  disconnected: {
    color: 'red'
  },
  paymentDetails: {
    paddingBottom: 20
  },
  recipient: {
    paddingBottom: 5
  },
  dropdown_container: {
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  selected: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  selectedTitle: {
    fontSize: 12,
    width: '35%'
  },
  selectedValue: {
    width: '65%',
    fontSize: 10
  },
  buttons: {
    height: 80,
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  error_container: {
    paddingBottom: 3
  },
  error: {
    paddingHorizontal: 10,
    color: 'red',
    fontSize: 12,
    fontWeight: '700'
  }
})

function mapStateToProps(state) {
  return {
    paymentDetails: state.payment.paymentDetails,
    accounts: state.account.accountList,
    connectionStatus: state.xrp.isConnected,
    price: state.price.price
  }
}

export default connect(mapStateToProps)(ConfirmPaymentScreen);