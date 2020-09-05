/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import './shim.js';
import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { websocketConnect } from './src/connections/websockets/RippleWebSocket';
import { xrpPriceFeedConnect } from './src/connections/websockets/BitstampWebSocket';


import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import ViewFundsScreen from './src/screens/ViewFundsScreen';
import ScanBarcodeScreen from './src/screens/ScanBarcodeScreen';
import ConfirmPaymentScreen from './src/screens/ConfirmPaymentScreen.js';
import PaymentTrackerScreen from './src/screens/PaymentTrackerScreen.js';
import ReceiveFundsScreen from './src/screens/ReceiveFundsScreen.js';
import AccountManagementScreen from './src/screens/AccountManagementScreen.js';
import AccountHistoryScreen from './src/screens/AccountHistoryScreen.js';
import DisputeManagementScreen from './src/screens/DisputeManagementScreen.js';
import SettingsScreen from './src/screens/SettingsScreen.js';
import AwaitSigninScreen from './src/screens/AwaitSigninScreen';
import AddAccountScreen from './src/screens/AddAccountScreen.js';


import { setNavigator} from './src/utils/navigationRef';
import Icon from 'react-native-vector-icons/Ionicons';


console.disableYellowBox = true;


const switchNavigator = createSwitchNavigator({
  login: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  Loading: LoadingScreen,
  DrawerFlow: createDrawerNavigator({
    Payments: createBottomTabNavigator({
      ViewFunds: {
        screen:ViewFundsScreen,
        navigationOptions:{
          tabBarLabel: 'View Funds',
          tabBarIcon:(() => (
            <Icon name='wallet-outline' size={25}/>
          ))
        }
      },
      Send: {
        screen: createSwitchNavigator({
        Barcode: ScanBarcodeScreen,
        Confirm: ConfirmPaymentScreen,
        Tracker: PaymentTrackerScreen  
      }),
      navigationOptions:{
        tabBarIcon:(() => (
          <Icon name='arrow-forward-outline' size={25}/>
        ))
      }},
      Receive: {
        screen: ReceiveFundsScreen,
        navigationOptions:{
          tabBarIcon:(() => (
            <Icon name='arrow-back-outline' size={25}/>
          ))
        }
    }}),
    Accounts: AccountManagementScreen,
    History: AccountHistoryScreen,
    Disputes: DisputeManagementScreen,
    Settings: SettingsScreen,
    SignOut: {
      screen: SigninScreen,
      navigationOptions:{
        tabBarLabel: 'Sign Out'
      }
    }   
  })  
})

const App = createAppContainer(switchNavigator)


export default () => {

  useEffect(() => {
    console.log('Connecting to XRPL WebSocket');
    websocketConnect()
    console.log('Connecting to XRP Price Websocket')
    xrpPriceFeedConnect()
  }, [])

  return (
      <Provider store={store}>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </Provider> 
  )
} 
