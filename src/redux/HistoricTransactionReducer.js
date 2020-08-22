import { 
  ADD_TRANSACTION,
  ADD_TRANSACTION_SENT, 
  ADD_TRANSACTION_ERROR,
  ADD_EF_TRANSACTION,
  ADD_EF_TRANSACTION_SENT, 
  ADD_EF_TRANSACTION_ERROR, 
 } from './HistoricTransactionActions';

 const INITIAL_STATE = {
  isProcessing: false,
  transactionList: [],
  histErrorMessage: ''
}

const merge = (prev, next) => Object.assign({}, prev, next)

const HistoricTransactionReducer = (state = INITIAL_STATE, action) => {
  //console.log('In account reducer:',action.type)
  switch (action.type) {
    case ADD_TRANSACTION:
      return merge(state, { transactionList: [...state.transactionList, action.payload], histErrorMessage: '', isProcessing: false })
    case ADD_TRANSACTION_SENT:
      return merge(state, { histErrorMessage: '', isProcessing: true })
    case ADD_TRANSACTION_ERROR:
      return merge(state, { histErrorMessage: action.payload, isProcessing: false })
    case ADD_EF_TRANSACTION:
      return merge(state, { transactionList: state.transactionList.map(transaction => 
        { if (transaction.transactionDetails.TransactionType === 'EscrowCreate' && transaction.transactionDetails.Condition === action.payload.transactionDetails.Condition) {
          return merge(transaction, { FinishDetails: action.payload.transactionDetails })  
        } else
          return transaction
        }), histErrorMessage: '', isProcessing: false })
    case ADD_EF_TRANSACTION_SENT:
      return merge(state, { histErrorMessage: '', isProcessing: true })
    case ADD_EF_TRANSACTION_ERROR:
      return merge(state, { histErrorMessage: action.payload, isProcessing: false })
    default:
      return state;
  }
}

export default HistoricTransactionReducer

