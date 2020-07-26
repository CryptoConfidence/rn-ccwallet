import { 
  ADD_PAYMENT,
  REMOVE_PAYMENT,
  ADD_PAYMENT_SENT, 
  REMOVE_PAYMENT_SENT,
  ADD_PAYMENT_ERROR, 
  REMOVE_PAYMENT_ERROR,
} from './PaymentActions';

const INITIAL_STATE = {
  
}

const merge = (prev, next) => Object.assign({}, prev, next)

const PaymentReducer = (state = INITIAL_STATE, action) => {
  //console.log('In Payment reducer:',action.type)
  switch (action.type) {
    case ADD_PAYMENT:
      return merge(state, { paymentDetails: action.payload, paymentErrorMessage: '', isProcessing: false })
    case REMOVE_PAYMENT:
      return merge(state, { paymentDetails: '', paymentErrorMessage: '', isProcessing: false })
    case ADD_PAYMENT_SENT:
      return merge(state, { paymentErrorMessage: '', isProcessing: true })
    case REMOVE_PAYMENT_SENT:
      return merge(state, { payentErrorMessage: '', isProcessing: true })
    case ADD_PAYMENT_ERROR:
      return merge(state, { paymentErrorMessage: action.payload, isProcessing: false })
    case REMOVE_PAYMENT_ERROR:
      return merge(state, { paymentErrorMessage: action.payload, isProcessing: false })
    default:
      return state;
  }
}
  
export default PaymentReducer