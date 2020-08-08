import AsyncStorage from '@react-native-community/async-storage';

// action types
export const UPDATE_PRICE = 'UPDATE_PRICE'
export const UPDATE_PRICE_SENT = 'UPDATE_PRICE_SENT'
export const UPDATE_PRICE_ERROR = 'UPDATE_PRICE_ERROR'

// action creators
export const updatePrice = ( latestTrade ) => async (dispatch) => {
  //console.log('Latest Trade Details', latestTrade);
  dispatch({ type: UPDATE_PRICE_SENT })
  try {
    
    console.log('Add UpdatePrice triggered')
    console.log('LatestTrade Info:', latestTrade.data.timestamp)

    const latestPriceDetails = {
      currency: "xrp",
      timestamp: latestTrade.data.timestamp,
      price: latestTrade.data.price_str
    }

    dispatch({ type: UPDATE_PRICE, payload: latestPriceDetails })
    
    console.log('New Price added successfully')
  } catch (error) {
    dispatch({ type: UPDATE_PRICE_ERROR, payload: 'Something went wrong updating price details:', error })
  }
}