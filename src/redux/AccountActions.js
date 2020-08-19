import AsyncStorage from '@react-native-community/async-storage';
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

export const reloadLocalAccounts = () => async (dispatch) => {
  console.log('Reloading Local Accounts')
  try {
    const localAccountsString = await AsyncStorage.getItem('accounts')
    const localAccounts = JSON.parse(localAccountsString)
    if (localAccounts) {
      localAccounts.forEach((account) => {
        console.log('Adding account to store:', account)
        dispatch({ type: ADD_ACCOUNT, payload: account })
      })
    } else {
      console.log('No local accounts available')
    }
  } catch (error) {
    console.log('Error loading accounts from storage:', error)
  }
}

// action creators
export const addAccount = () => async (dispatch) => {
  counter = counter + 1;
  dispatch({ type: ADD_ACCOUNT_SENT })
  try {
    console.log('Add account triggered')
    var account = RippleApi.generateAddress()
    accountSubscribe(account.address);
    console.log('Credentials generated', account)
    
    // Just supply a dummy name for now (until I allow the user to set / edit it)
    account.name = `XRP Account ${counter}`;
    account.currency = 'XRP';
    account.balance = 0.000000;

    // TODO persist the accounts to the db (could be useful later)
    //const response = await CCApi.post('addaccount', { address })
    
    const existingAccountsString = await AsyncStorage.getItem('accounts')
    var existingAccounts = JSON.parse(existingAccountsString)
    
    if (existingAccounts === null) {
      existingAccounts = []
    }
    existingAccounts.push(account)
    const newAccountsString = JSON.stringify(existingAccounts)
    
    await AsyncStorage.setItem('accounts', newAccountsString)
    dispatch({ type: ADD_ACCOUNT, payload: account })
    
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
    
    // Hack to remove all accounts from storage (if I break it during testing)
    //await AsyncStorage.removeItem('accounts')
    
    const existingAccountsString = await AsyncStorage.getItem('accounts')
    const existingAccounts = JSON.parse(existingAccountsString)
    
    const newAccountList = existingAccounts.filter(account => account.xAddress !== xAddress )
    const newAccountListString = JSON.stringify(newAccountList)
    
    await AsyncStorage.setItem('accounts', newAccountListString)
    dispatch({ type: REMOVE_ACCOUNT, payload: xAddress })
    
    console.log('New account added successfully')
  } catch (error) {
    dispatch({ type: REMOVE_ACCOUNT_ERROR, payload: 'Something went wrong removing the account:', error })
  }
}

export const updateBalance = ({ address, newBalance }) => async (dispatch) => {
  dispatch({ type: BALANCE_UPDATE_SENT })
  try {
    console.log('Updating Balance of:', address, ' to:', newBalance)
    
    const existingAccountsString = await AsyncStorage.getItem('accounts')
    var existingAccounts = JSON.parse(existingAccountsString)
    
    existingAccounts.forEach(item => {
      if (item.address === address) {
        item.balance = newBalance;
      }
    })
    console.log('Existing Accounts', existingAccounts) 
    const newAccountListString = JSON.stringify(existingAccounts)
    
    await AsyncStorage.setItem('accounts', newAccountListString)  
    dispatch({ type: BALANCE_UPDATE, payload: { address, balance: newBalance } })
    
    console.log('Balance updated successfully')
  } catch (error) {
    dispatch({ type: BALANCE_UPDATE_ERROR, payload: 'Something went wrong updating the balance:', error })
  }
}
