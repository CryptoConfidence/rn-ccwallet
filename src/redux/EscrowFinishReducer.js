import { 
  ADD_EF_TXN_RESULT,
  ADD_EF_TXN_VALIDATE,
  REMOVE_TXN,
  ADD_EF_TXN_RESULT_SENT,
  ADD_EF_TXN_VALIDATE_SENT,
  REMOVE_TXN_SENT,
  ADD_EF_TXN_RESULT_ERROR,
  ADD_EF_TXN_VALIDATE_ERROR, 
  REMOVE_TXN_ERROR 
} from './EscrowFinishActions';

const INITIAL_STATE = {
  isProcessing: false,
  txnResult: null,
  txnValidation: null,
  resultErrorMessage: '',
  validationErrorMessage: '',
  removalErrorMessage: ''
}

const merge = (prev, next) => Object.assign({}, prev, next)

const EscrowFinishReducer = (state = INITIAL_STATE, action) => {
  //console.log('In account reducer:',action.type)
  switch (action.type) {
    case ADD_EF_TXN_RESULT:
      return merge(state, {txnResult: action.payload, resultErrorMessage: '', isProcessing: false })
    case ADD_EF_TXN_VALIDATE:
      return merge(state, {txnValidation: action.payload, validationErrorMessage: '', isProcessing: false })
      case REMOVE_TXN:
        return merge(state, {txnResult: "", txnValidation: "", removalErrorMessage: '', isProcessing: false })
    case ADD_EF_TXN_RESULT_SENT:
      return merge(state, { resultErrorMessage: '', isProcessing: true })
    case ADD_EF_TXN_VALIDATE_SENT:
      return merge(state, { validationErrorMessage: '', isProcessing: true })
    case REMOVE_TXN_SENT:
      return merge(state, { removalErrorMessage: '', isProcessing: true })
    case ADD_EF_TXN_RESULT_ERROR:
      return merge(state, { resultErrorMessage: action.payload, isProcessing: false })
    case ADD_EF_TXN_VALIDATE_ERROR:
      return merge(state, { validationErrorMessage: action.payload, isProcessing: false })
    case REMOVE_TXN_ERROR:
      return merge(state, { removalErrorMessage: action.payload, isProcessing: false })
    default:
      return state;
  }
}

export default EscrowFinishReducer;