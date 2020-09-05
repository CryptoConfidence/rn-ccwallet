import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//import { Dropdown } from 'react-native-material-dropdown-v2';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-generator';

const ReceiveFundsScreen = ({ accounts }) => {

  const [accountSelected, setAccountSelected] = useState('');

  const accountNames = accounts.map(account => {
    if (account) {
      return { 
        value: account.xAddress,
        label: account.name, 
        key: account.name  
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

      <View style={styles.qrcode_wrapper}>
        <QRCode
          value={accountSelected.xAddress}
          size={200}
          bgColor='black'
          fgColor='white'
        />
      </View>
      

      <Text style={styles.address}> {accountSelected.xAddress} </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1F3' 
  },
  dropdown_container: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 10
  },
  qrcode_wrapper: {
    paddingTop: 15,
    alignItems: 'center',
    paddingBottom: 5
  },
  address: {
    paddingHorizontal: '10%',
    alignItems: 'center',
    paddingTop: 15
  }
})

function mapStateToProps(state) {
  return {
    accounts: state.account.accountList,
  }
}

export default connect(mapStateToProps)(ReceiveFundsScreen);