import RippleApi from '../connections/api/RippleAPI';

// action types
export const CONNECT_SENT = 'CONNECT_SENT'
export const DISCONNECT_SENT = 'DISCONNECT_SENT'
export const CONN_STATUS_SENT = 'CONN_STATUS_SENT'
export const CONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'
export const CONN_STATUS = 'CONN_STATUS'
export const ADD_ERROR = 'ADD_ERROR' 

// action creators
export const ledgerConnect = () => async (dispatch) => {
  dispatch({ type: CONNECT_SENT }) 
  console.log('Connect requested');
  try {
    await RippleApi.connect();
    dispatch({ type: CONNECTED })  
  } catch (error) {
    dispatch({ type: ADD_ERROR })
    console.log('Error thrown attempting to connect to XRP Ledger:', error)
  }
  return;
};

export const ledgerStatus = () => async (dispatch) => {
  dispatch({ type: CONN_STATUS_SENT })
  console.log('Checking Status')
  try {
    const status = await RippleApi.isConnected();
    dispatch({ type: CONN_STATUS, payload: status })
  } catch (error) {
    dispatch({ type: ADD_ERROR })
    console.log('Error thrown attempting to get connection status:', error)
  }
  return; 
}

export const ledgerDisconnect = () => async (dispatch) => {
  dispatch({ type: DISCONNECT_SENT })
  console.log('Disconnect requested')
  try {
    await RippleApi.disconnect();
    dispatch({ type: DISCONNECTED })
  } catch (error) {
    dispatch({ type: ADD_ERROR })
    console.log('Error thrown attempting to disconnect from XRP Ledger:', error)
  }
}
