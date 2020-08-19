import { store } from '../redux/store';
import { updateBalance } from '../redux/AccountActions';
import RippleApi from '../connections/api/RippleAPI';

export const AccountHandler = function (data) {

  if (data.type === 'response') {
    store.dispatch(
      updateBalance({
        address: data.result.account_data.Account,
        newBalance: RippleApi.dropsToXrp(parseFloat(data.result.account_data.Balance)) 
      })
    );
  }

}

