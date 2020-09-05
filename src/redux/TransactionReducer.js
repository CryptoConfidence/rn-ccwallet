import { 
  ADD_TXN_PREPARE,
  ADD_TXN_SIGN,
  ADD_TXN_RESULT,
  ADD_TXN_VALIDATE,
  REMOVE_TXN,
  ADD_TXN_PREPARE_SENT, 
  ADD_TXN_SIGN_SENT,
  ADD_TXN_RESULT_SENT,
  ADD_TXN_VALIDATE_SENT,
  REMOVE_TXN_SENT,
  ADD_TXN_PREPARE_ERROR,
  ADD_TXN_SIGN_ERROR,
  ADD_TXN_RESULT_ERROR,
  ADD_TXN_VALIDATE_ERROR,
  REMOVE_TXN_ERROR
} from './TransactionActions';

const INITIAL_STATE = {
  isProcessing: false,
  txnPrepared: null,
  txnSigned: null,
  txnResult: null,
  txnValidation: null,
  prepareErrorMessage: '',
  signErrorMessage: '',
  resultErrorMessage: '',
  validationErrorMessage: '',
  removalErrorMessage: ''
}

const merge = (prev, next) => Object.assign({}, prev, next)

const TransactionReducer = (state = INITIAL_STATE, action) => {
  //console.log('In account reducer:',action.type)
  switch (action.type) {
    case ADD_TXN_PREPARE:
      return merge(state, {txnPrepared: action.payload, prepareErrorMessage: '', isProcessing: false })
    case ADD_TXN_SIGN:
      return merge(state, {txnSigned: action.payload, signErrorMessage: '', isProcessing: false })
    case ADD_TXN_RESULT:
      return merge(state, {txnResult: action.payload, resultErrorMessage: '', isProcessing: false })
    case ADD_TXN_VALIDATE:
      return merge(state, {txnValidation: action.payload, validationErrorMessage: '', isProcessing: false })
    case REMOVE_TXN:
      return merge(state, {txnPrepared: "", txnSigned: "", txnResult: "", txnValidation: "", removalErrorMessage: '', isProcessing: false })
    case ADD_TXN_PREPARE_SENT:
      return merge(state, { prepareErrorMessage: '', isProcessing: true })
    case ADD_TXN_SIGN_SENT:
      return merge(state, { signErrorMessage: '', isProcessing: true })
    case ADD_TXN_RESULT_SENT:
      return merge(state, { resultErrorMessage: '', isProcessing: true })
    case ADD_TXN_VALIDATE_SENT:
      return merge(state, { validationErrorMessage: '', isProcessing: true })
    case REMOVE_TXN_SENT:
      return merge(state, { removalErrorMessage: '', isProcessing: true })
    case ADD_TXN_PREPARE_ERROR:
      return merge(state, { prepareErrorMessage: action.payload, isProcessing: false })
    case ADD_TXN_SIGN_ERROR:
      return merge(state, { signErrorMessage: action.payload, isProcessing: false })
    case ADD_TXN_RESULT_ERROR:
      return merge(state, { resultErrorMessage: action.payload, isProcessing: false })
    case ADD_TXN_VALIDATE_ERROR:
      return merge(state, { validationErrorMessage: action.payload, isProcessing: false })
    case REMOVE_TXN_ERROR:
      return merge(state, { removalErrorMessage: action.payload, isProcessing: false })
    default:
      return state;
  }
}

export default TransactionReducer;