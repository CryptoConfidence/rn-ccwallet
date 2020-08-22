

// action types
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const ADD_TRANSACTION_SENT = 'ADD_TRANSACTION_SENT'
export const ADD_TRANSACTION_ERROR = 'ADD_TRANSACTION_ERROR'
export const ADD_EF_TRANSACTION = 'ADD_EF_TRANSACTION'
export const ADD_EF_TRANSACTION_SENT = 'ADD_EF_TRANSACTION_SENT'
export const ADD_EF_TRANSACTION_ERROR = 'ADD_EF_TRANSACTION_ERROR'


// action creators
export const addTransaction = ({account, transaction}) => async (dispatch) => {
  dispatch({ type: ADD_TRANSACTION_SENT })
  try {
    console.log('Adding transaction for account', account)
    dispatch({ type: ADD_TRANSACTION, payload: { account, transactionDetails: transaction }})

    console.log('New transaction added successfully')
  } catch (error) {
    dispatch({ type: ADD_TRANSACTION_ERROR, payload: 'Something went wrong adding the new transaction:', error })
  }
}


// Handle Excrow Finish differently (store as part of the Escrow Create data)
export const addEscrowFinishTransaction = ({account, transaction}) => async (dispatch) => {
  dispatch({ type: ADD_EF_TRANSACTION_SENT })
  try {
    console.log('Adding Escrow Finish transaction for account', account)
    dispatch({ type: ADD_EF_TRANSACTION, payload: { transactionDetails: transaction }})

    console.log('New Escrow Finish transaction added successfully')
  } catch (error) {
    dispatch({ type: ADD_EF_TRANSACTION_ERROR, payload: 'Something went wrong adding the new Escrow Finish transaction:', error })
  }
}