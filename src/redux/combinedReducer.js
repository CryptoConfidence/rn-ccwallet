import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import XRPReducer from './XRPReducer';
import AccountReducer from './AccountReducer';
import PaymentReducer from './PaymentReduer';
import TransactionReducer from './TransactionReducer';
import EscrowCreateReducer from './EscrowCreateReducer';
import EscrowFinishReducer from './EscrowFinishReducer';
import PriceReducer from './PriceReducer';
import HistoricTransactionReducer from './HistoricTransactionReducer';

const combinedReducer = combineReducers({
  auth: AuthReducer,
  xrp: XRPReducer,
  account: AccountReducer,
  payment: PaymentReducer,
  price: PriceReducer,
  transaction: TransactionReducer,
  escrow_create: EscrowCreateReducer,
  escrow_finish: EscrowFinishReducer,
  history: HistoricTransactionReducer
})

export default combinedReducer;