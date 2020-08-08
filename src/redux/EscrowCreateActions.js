import AsyncStorage from '@react-native-community/async-storage';

// action types
export const ADD_EC_TXN_PREPARE = 'ADD_EC_TXN_PREPARE'
export const ADD_EC_TXN_SIGN = 'ADD_EC_TXN_SIGN'
export const ADD_EC_TXN_RESULT = 'ADD_EC_TXN_RESULT'
export const ADD_EC_TXN_VALIDATE = 'ADD_EC_TXN_VALIDATE'
export const ADD_EC_TXN_PREPARE_SENT = 'ADD_EC_TXN_PREPARE_SENT'
export const ADD_EC_TXN_SIGN_SENT = 'ADD_EC_TXN_SIGN_SENT'
export const ADD_EC_TXN_RESULT_SENT = 'ADD_EC_TXN_RESULT_SENT'
export const ADD_EC_TXN_VALIDATE_SENT = 'ADD_EC_TXN_VALIDATE_SENT'
export const ADD_EC_TXN_PREPARE_ERROR = 'ADD_EC_TXN_PREPARE_ERROR'
export const ADD_EC_TXN_SIGN_ERROR = 'ADD_EC_TXN_SIGN_ERROR'
export const ADD_EC_TXN_RESULT_ERROR = 'ADD_EC_TXN_RESULT_ERROR'
export const ADD_EC_TXN_VALIDATE_ERROR = 'ADD_EC_TXN_VALIDATE_ERROR'

// action creators
export const setPreparedTxn = (preparedTxn) => async (dispatch) => {
  dispatch({ type: ADD_EC_TXN_PREPARE_SENT })
  try {
    console.log('Action setPreparedTxn')

    dispatch({ type: ADD_EC_TXN_PREPARE, payload: preparedTxn })
    console.log('Prepared Txn added successfully')
  } catch (error) {
    dispatch({ type: ADD_EC_TXN_PREPARE_ERROR, payload: 'Something went wrong adding prepared txn to store:', error })
  }
}

export const setSignedTxn = (signedTxn) => async (dispatch) => {
  dispatch({ type: ADD_EC_TXN_SIGN_SENT })
  try {
    console.log('Action setSignedTxn')
    dispatch({ type: ADD_EC_TXN_SIGN, payload: signedTxn })
    console.log('Signed Txn added successfully')
  } catch (error) {
    dispatch({ type: ADD_EC_TXN_SIGN_ERROR, payload: 'Something went wrong adding signed txn to store:', error })
  }
}

export const setTxnResult = (txnResult) => async (dispatch) => {
  dispatch({ type: ADD_EC_TXN_RESULT_SENT })
  try {
    console.log('Action setTxnResult')
    dispatch({ type: ADD_EC_TXN_RESULT, payload: txnResult })
    console.log('Txn Result added successfully')
  } catch (error) {
    dispatch({ type: ADD_EC_TXN_RESULT_ERROR, payload: 'Something went wrong adding txn result to store:', error })
  }
}

export const setTxnValidation = (txnValidation) => async (dispatch) => {
  dispatch({ type: ADD_EC_TXN_VALIDATE_SENT })
  try {
    console.log('Action setTxnValidation')
    dispatch({ type: ADD_EC_TXN_VALIDATE, payload: txnValidation })
    console.log('Prepared Txn added successfully')
  } catch (error) {
    dispatch({ type: ADD_EC_TXN_VALIDATE_ERROR, payload: 'Something went wrong adding txn validation to store:', error })
  }
}