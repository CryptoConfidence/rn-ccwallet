/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import './shim.js';
import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { websocketConnect } from './src/connections/websockets/RippleWebSocket';

import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ViewFundsScreen from './src/screens/ViewFundsScreen';
import ScanBarcodeScreen from './src/screens/ScanBarcodeScreen';
import ConfirmPaymentScreen from './src/screens/ConfirmPaymentScreen.js';
import ReceiveFundsScreen from './src/screens/ReceiveFundsScreen.js';
import AddAccountScreen from './src/screens/AddAccountScreen.js';
import AccountManagementScreen from './src/screens/AccountManagementScreen.js';
import AccountHistoryScreen from './src/screens/AccountHistoryScreen.js';
import DisputeManagementScreen from './src/screens/DisputeManagementScreen.js';
import SettingsScreen from './src/screens/SettingsScreen.js';
import AwaitSigninScreen from './src/screens/AwaitSigninScreen';

import { setNavigator} from './src/utils/navigationRef';

const switchNavigator = createSwitchNavigator({
  Await: AwaitSigninScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  DrawerFlow: createDrawerNavigator({
    Payments: createBottomTabNavigator({
      ViewFunds: ViewFundsScreen,
      Send: createSwitchNavigator({
        Barcode: ScanBarcodeScreen,
        Confirm: ConfirmPaymentScreen
      }),
      Receive: ReceiveFundsScreen,
    }),
    Accounts: AccountManagementScreen,
    History: AccountHistoryScreen,
    Disputes: DisputeManagementScreen,
    Settings: SettingsScreen,
    SignOut: SigninScreen   
  })  
})

const App = createAppContainer(switchNavigator)


export default () => {

  useEffect(() => {
    console.log('Connecting to WebSocket');
    websocketConnect()
  }, [])

  return (
      <Provider store={store}>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </Provider> 
  )
} 
