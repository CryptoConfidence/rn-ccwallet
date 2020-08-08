import { useEffect } from 'react';
import { connect } from 'react-redux';
import { tryLocalSignin } from '../redux/AuthActions';
import { tryReloadLocalAccounts } from '../redux/AccountActions';
import { xrplAccountSubscribe } from '../subscribers/AccountSubscribers';
import { xrpPriceFeedConnect } from '../connections/websockets/BitstampWebSocket';

const AwaitSigninScreen = ({ tryLocalSignin, tryReloadLocalAccounts, xrplAccountSubscribe, xrpPriceFeedConnect }) => {
  
  useEffect(() => {
    tryLocalSignin()
    tryReloadLocalAccounts() // This gets the known accounts from persisted storage
    try {
      xrplAccountSubscribe() // This gets the latest info for those accounts and starts the subscribers
      //xrpPriceFeedConnect()  // Start listening for Price updates
    } catch (error) {
      console.log('Error attempting to subscribe to accounts:', error )
    }
    
  }, [])
  
  return null
}



export default connect(null, { tryLocalSignin, tryReloadLocalAccounts, xrplAccountSubscribe, xrpPriceFeedConnect })(AwaitSigninScreen);