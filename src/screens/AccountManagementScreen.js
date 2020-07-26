import React from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addAccount, removeAccount } from '../redux/AccountActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const AccountManagementScreen = ({ navigation, addAccount, accounts, removeAccount }) => {
  return (
    <View style={styles.container}>

      <Header
        style={styles.header} 
        menuAction={() => navigation.toggleDrawer()} 
      />

      <View style={styles.mainview_container}>
        <FlatList
          data={accounts}
          keyExtractor={item => item.xAddress}
          renderItem={({ item }) => {
            return (
              <View style={styles.listitem}>
                <Text style={styles.account}> {item.xAddress} </Text>
                
                <View style={styles.touchable_container}>
                  <TouchableOpacity style={styles.touchable}
                  onPress={() => console.log('Edit Account', item.xAddress, 'selected')}
                  >
                    <Icon name="pencil" style={styles.edit} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.touchable}
                  onPress={() => removeAccount({xAddress: item.xAddress })}
                  >
                    <Icon name="trash" style={styles.remove} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </View>

      <Button title='Create Account' onPress={() => addAccount()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  mainview_container: {
    flex: 2
  },
  listitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingTop: 10
  },
  account: {
    fontSize: 14,
    width: '75%'

  },
  touchable_container: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  edit: {
    fontSize: 24,
    paddingLeft: '40%'
  },
  remove: {
    fontSize: 24
  },
  //button_container: {
  //}
})

function mapStateToProps(state) {
  return {
    accounts: state.account.accountList,
    errorMessage: state.account.errorMessage
  }
}

export default connect(mapStateToProps,{addAccount, removeAccount})(AccountManagementScreen);