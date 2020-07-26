import { SIGN_IN, SIGN_OUT, ADD_ERROR, CLEAR_ERROR, SIGNIN_SENT, SIGNUP_SENT, SIGNOUT_SENT } from './AuthActions'

const merge = (prev, next) => Object.assign({}, prev, next)

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return merge(state, { token: action.payload, errorMessage: '', isProcessing: false })
    case SIGN_OUT:
      return merge(state, { token: null, errorMessage: '', isProcessing: false  })
    case ADD_ERROR:
      return merge(state, { errorMessage: action.payload, isProcessing: false })
    case CLEAR_ERROR:
      return merge(state, { errorMessage: '' })
    case SIGNIN_SENT:
      return merge(state, { isProcessing: true })
    case SIGNUP_SENT:
      return merge(state, { isProcessing: true })
    case SIGNOUT_SENT:
      return merge(state, { isProcessing: true })
    default:
      return state;
  }
}

export default AuthReducer
