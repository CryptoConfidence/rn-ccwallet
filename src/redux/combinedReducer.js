import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import XRPReducer from './XRPReducer';
import AccountReducer from './AccountReducer';
import PaymentReducer from './PaymentReduer';
import TransactionReducer from './TransactionReducer';

const combinedReducer = combineReducers({
  auth: AuthReducer,
  xrp: XRPReducer,
  account: AccountReducer,
  payment: PaymentReducer,
  transaction: TransactionReducer,
})

export default combinedReducer;