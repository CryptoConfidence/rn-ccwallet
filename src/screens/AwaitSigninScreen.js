import { useEffect } from 'react';
import { connect } from 'react-redux';
import { tryLocalSignin } from '../redux/AuthActions';

const AwaitSigninScreen = ({ tryLocalSignin }) => {
  
  useEffect(() => {
    tryLocalSignin()
  }, [])
  
  return null
}



export default connect(null, { tryLocalSignin })(AwaitSigninScreen);