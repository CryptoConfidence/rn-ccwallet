import CCApi from '../connections/api/CCAPI';
import AsyncStorage from '@react-native-community/async-storage'; 
import { navigate } from '../utils/navigationRef';

// action types
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SIGNUP_SENT = 'SIGNUP_SENT'
export const SIGNIN_SENT = 'SIGNIN_SENT'
export const SIGNOUT_SENT = 'SIGNOUT_SENT'
export const ADD_ERROR = 'ADD_LOGIN_ERROR'
export const CLEAR_ERROR = 'CLEAR_LOGIN_ERROR'


// action creators
export const tryLocalSignin = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: SIGN_IN, payload: token })
    navigate('ViewFunds')
  } else {
    navigate('loginFlow')
  }
}

export const clearErrorMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
}


export const signup = ({ email, password }) => async (dispatch) => {
  dispatch({ type: SIGNUP_SENT })
  try {
    console.log('Sign up triggered')
    const response = await CCApi.post('signup', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: SIGN_IN, payload: response.data.token })
    navigate('ViewFunds')
    console.log('Signed up successfully')
  } catch (error) {
    dispatch({ type: ADD_ERROR, payload: 'Something went wrong with sign up:', error })
  }
}


export const signin = ({ email, password }) => async (dispatch) => {
  dispatch({ type: SIGNIN_SENT })
  try {
    console.log('Sign in triggered')
    const response = await CCApi.post('/signin', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: SIGN_IN, payload: response.data.token })
    navigate('ViewFunds')
    console.log('Signed in successfully')
  } catch (error) {
    dispatch({ type: ADD_ERROR, payload: 'Something went wrong with sign in:', error })
  }
}

export const signout = () => async (dispatch) => {
  dispatch({ type: SIGNOUT_SENT })
  try {
    console.log('Sign out triggered')
    await AsyncStorage.removeItem('token')
    dispatch({ type: SIGN_OUT })
    navigate('loginFlow')
  } catch (error) {
    dispatch({ type: ADD_ERROR, payload: 'Something went wrong with sign out:', error })
  }
  
}


