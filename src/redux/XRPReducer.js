import { CONNECT_SENT, CONNECTED, DISCONNECT_SENT, DISCONNECTED, CONN_STATUS_SENT, CONN_STATUS, ADD_ERROR } from './XRPActions'

const merge = (prev, next) => Object.assign({}, prev, next)

const XRPReducer = (state = {}, action) => {
  switch (action.type) {
    case CONNECT_SENT:
      return merge(state, { isProcessing: true })
    case CONNECTED:
      return merge(state, { isConnected: true, errorMessage: '', isProcessing: false })
    case DISCONNECT_SENT:
      return merge(state, { isProcessing: true })
    case DISCONNECTED:
      return merge(state, { isConnected: false, errorMessage: '', isProcessing: false })
    case CONN_STATUS_SENT:
      return merge(state, { isProcessing: true })
    case CONN_STATUS:
      return merge(state, { isConnected: action.payload, errorMessage: '', isProcessing: false })
    case ADD_ERROR:
      return merge(state, { errorMessage: action.payload })
    default:
      return state;
  }
}

export default XRPReducer
