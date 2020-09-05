import AsyncStorage from '@react-native-community/async-storage';

// action types
export const ADD_EF_TXN_RESULT = 'ADD_EF_TXN_RESULT'
export const ADD_EF_TXN_VALIDATE = 'ADD_EF_TXN_VALIDATE'
export const REMOVE_TXN = 'REMOVE_TXN'
export const ADD_EF_TXN_RESULT_SENT = 'ADD_EF_TXN_RESULT_SENT'
export const ADD_EF_TXN_VALIDATE_SENT = 'ADD_EF_TXN_VALIDATE_SENT'
export const REMOVE_TXN_SENT = 'REMOVE_TXN_SENT'
export const ADD_EF_TXN_RESULT_ERROR = 'ADD_EF_TXN_RESULT_ERROR'
export const ADD_EF_TXN_VALIDATE_ERROR = 'ADD_EF_TXN_VALIDATE_ERROR'
export const REMOVE_TXN_ERROR = 'REMOVE_TXN_ERROR'

// action creators
export const setTxnResult = (txnResult) => async (dispatch) => {
  dispatch({ type: ADD_EF_TXN_RESULT_SENT })
  try {
    console.log('Action setTxnResult')
    dispatch({ type: ADD_EF_TXN_RESULT, payload: txnResult })
    console.log('Txn Result added successfully')
  } catch (error) {
    dispatch({ type: ADD_EF_TXN_RESULT_ERROR, payload: 'Something went wrong adding txn result to store:', error })
  }
}

export const setTxnValidation = (txnValidation) => async (dispatch) => {
  dispatch({ type: ADD_EF_TXN_VALIDATE_SENT })
  try {
    console.log('Action setTxnValidation')
    dispatch({ type: ADD_EF_TXN_VALIDATE, payload: txnValidation })
    console.log('Prepared Txn added successfully')
  } catch (error) {
    dispatch({ type: ADD_EF_TXN_VALIDATE_ERROR, payload: 'Something went wrong adding txn validation to store:', error })
  }
}

export const removeTxn = () => async (dispatch) => {
  dispatch({ type: REMOVE_TXN_SENT })
  try {
    console.log('Action removeTxn')
    dispatch({ type: REMOVE_TXN })
    console.log('Removed Live transaction data successfully')
  } catch (error) {
    dispatch({ type: REMOVE_TXN_ERROR, payload: 'Something went wrong removing transaction from store:', error })
  }
} 