import { AsyncStorage } from 'react-native';
import RippleApi from '../connections/api/RippleAPI';
import { accountSubscribe } from '../subscribers/AccountSubscribers';

// action types
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'
export const BALANCE_UPDATE = 'BALANCE_UPDATE'
export const ADD_ACCOUNT_SENT = 'ADD_ACCOUNT_SENT'
export const REMOVE_ACCOUNT_SENT = 'REMOVE_ACCOUNT_SENT'
export const BALANCE_UPDATE_SENT = 'BALANCE_UPDATE_SENT'
export const ADD_ACCOUNT_ERROR = 'ADD_ACCOUNT_ERROR'
export const REMOVE_ACCOUNT_ERROR = 'REMOVE_ACCOUNT_ERROR'
export const BALANCE_UPDATE_ERROR = 'BALANCE_UPDATE_ERROR'
 


var counter = 0;

// action creators
export const addAccount = () => async (dispatch) => {
  counter = counter + 1;
  dispatch({ type: ADD_ACCOUNT_SENT })
  try {
    console.log('Add account triggered')
    const credentials = RippleApi.generateAddress()
    accountSubscribe(credentials.address);
    console.log('Credentials generated', credentials)
    
    // Just supply a dummy name for now (until I allow the user to set / edit it)
    credentials.name = `XRP Account ${counter}`;
    credentials.currency = 'XRP';
    credentials.balance = 0.000000;
    // TODO persist the accounts to the db (could be useful later)
    //const response = await CCApi.post('addaccount', { address })
    
    // TODO persist accounts to local storage
    //var existingAccounts = await AsyncStorage.getItem('accounts')
    //if (existingAccounts === null) {
    //  existingAccounts = []
    //}
    //const newAccountList = existingAccounts.push(newAccount)
    //await AsyncStorage.setItem('accounts', newAccountList)
    dispatch({ type: ADD_ACCOUNT, payload: credentials })
    
    console.log('New account added successfully')
  } catch (error) {
    dispatch({ type: ADD_ACCOUNT_ERROR, payload: 'Something went wrong adding the new account:', error })
  }
}


export const removeAccount = ({ xAddress }) => async (dispatch) => {
  dispatch({ type: REMOVE_ACCOUNT_SENT })
  try {
    console.log('Removing account:', xAddress)
    // TODO remove the accounts to the db (could be useful later)
    //const response = await CCApi.post('disableAccount', { xAddress })
    
    // TODO remove accounts to local storage
    //var existingAccounts = await AsyncStorage.getItem('accounts')
    // filter existing accounts
    //await AsyncStorage.setItem('accounts', newAccountList)
    dispatch({ type: REMOVE_ACCOUNT, payload: xAddress })
    
    console.log('New account added successfully')
  } catch (error) {
    dispatch({ type: REMOVE_ACCOUNT_ERROR, payload: 'Something went wrong removing the account:', error })
  }
}

export const updateBalance = ({ address, newBalance }) => async (dispatch) => {
  dispatch({ type: BALANCE_UPDATE_SENT })
  try {
    // Do not need the try catch here but may use it later for async storage
    console.log('Updating Balance of:', address, ' to:', newBalance )
    dispatch({ type: BALANCE_UPDATE, payload: { address, balance: newBalance } })
    
    console.log('Balance updated successfully')
  } catch (error) {
    dispatch({ type: BALANCE_UPDATE_ERROR, payload: 'Something went wrong updating the balance:', error })
  }
}
