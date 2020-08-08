import { 
  UPDATE_PRICE,
  UPDATE_PRICE_SENT, 
  UPDATE_PRICE_ERROR, 
} from './PriceActions';

const INITIAL_STATE = {
  
}

const merge = (prev, next) => Object.assign({}, prev, next)

const PriceReducer = (state = INITIAL_STATE, action) => {
  //console.log('In Payment reducer:',action.type)
  switch (action.type) {
    case UPDATE_PRICE:
      return merge(state, { currency: action.payload.currency, timestamp: action.payload.timestamp, price: action.payload.price, priceUpdateErrorMessage: '', isProcessing: false })
    case UPDATE_PRICE_SENT:
      return merge(state, { priceUpdateErrorMessage: '', isProcessing: true })
    case UPDATE_PRICE_ERROR:
      return merge(state, { priceupdateErrorMessage: action.payload, isProcessing: false })
    default:
      return state;
  }
}
  
export default PriceReducer