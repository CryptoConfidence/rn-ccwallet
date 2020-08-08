import { store } from '../redux/store';
import { updatePrice } from '../redux/PriceActions';

export const PriceHandler = function (updateString) {
  console.log('New price update:', updateString)
  const update = JSON.parse(updateString)

  if (update.event === 'trade') {
    store.dispatch(updatePrice(update))
  }
  
}

