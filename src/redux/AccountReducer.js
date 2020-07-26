import { 
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  BALANCE_UPDATE, 
  ADD_ACCOUNT_SENT, 
  REMOVE_ACCOUNT_SENT,
  BALANCE_UPDATE_SENT, 
  ADD_ACCOUNT_ERROR, 
  REMOVE_ACCOUNT_ERROR,
  BALANCE_UPDATE_ERROR
 } from './AccountActions';

const INITIAL_STATE = {
  isProcessing: false,
  accountList: [],
  accountErrorMessage: '',
  balanceErrorMessage: ''
}

const merge = (prev, next) => Object.assign({}, prev, next)

const AccountReducer = (state = INITIAL_STATE, action) => {
  //console.log('In account reducer:',action.type)
  switch (action.type) {
    case ADD_ACCOUNT:
      return merge(state, {accountList: [...state.accountList, action.payload], accountErrorMessage: '', isProcessing: false })
    case REMOVE_ACCOUNT:
      return merge(state, { accountList: state.accountList.filter(account => account.xAddress !== action.payload), accountErrorMessage: '', isProcessing: false  })
    case BALANCE_UPDATE:
      return merge(state, { accountList: state.accountList.map(account => 
        { if (account.address === action.payload.address) {
          return merge(account, { balance: action.payload.balance })  
        } else
          return account
        }), balanceErrorMessage: '', isProcessing: false })
    case ADD_ACCOUNT_SENT:
      return merge(state, { accountErrorMessage: '', isProcessing: true })
    case REMOVE_ACCOUNT_SENT:
      return merge(state, { accountErrorMessage: '', isProcessing: true })
    case BALANCE_UPDATE_SENT:
      return merge(state, { balanceErrorMessage: '', isProcessing: true })
    case ADD_ACCOUNT_ERROR:
      return merge(state, { accountErrorMessage: action.payload, isProcessing: false })
    case REMOVE_ACCOUNT_ERROR:
      return merge(state, { accountErrorMessage: action.payload, isProcessing: false })
    case BALANCE_UPDATE_ERROR:
      return merge(state, { balanceErrorMessage: action.payload, isProcessing: false})
    default:
      return state;
  }
}

export default AccountReducer