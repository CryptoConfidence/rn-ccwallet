import AsyncStorage from '@react-native-community/async-storage';

// action types
export const ADD_PAYMENT = 'ADD_PAYMENT'
export const REMOVE_PAYMENT = 'REMOVE_PAYMENT'
export const ADD_PAYMENT_SENT = 'ADD_PAYMENT_SENT'
export const REMOVE_PAYMENT_SENT = 'REMOVE_PAYMENT_SENT'
export const ADD_PAYMENT_ERROR = 'ADD_PAYMENT_ERROR'
export const REMOVE_PAYMENT_ERROR = 'REMOVE_PAYMENT_ERROR'

// action creators
export const addPaymentDetails = ( paymentDetails ) => async (dispatch) => {
  console.log('Payment Details', paymentDetails);
  dispatch({ type: ADD_PAYMENT_SENT })
  try {
    console.log('Add PaymentDetails triggered')

    dispatch({ type: ADD_PAYMENT, payload: JSON.parse(paymentDetails) })
    
    console.log('New PaymentDetails added successfully')
  } catch (error) {
    dispatch({ type: ADD_PAYMENT_ERROR, payload: 'Something went wrong getting paymentdetails:', error })
  }
}