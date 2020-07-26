import { State } from "react-native-gesture-handler"
import { store } from '../redux/store';
import RippleApi from '../connections/api/RippleAPI';
import { updateBalance } from '../redux/AccountActions';

export const AccountHandler = function (tx) {
  console.log('TODO: Update state with this:', tx)
  const state = store.getState();
  const accounts = state.account.accountList;
  

  for (acnt=0; acnt < accounts.length; acnt++) {
    console.log('In for loop - stateAddress:', accounts[acnt].address, ' txAddress:', tx.transaction.Account, ' txDestination:', tx.transaction.Destination)
    if (accounts[acnt].address === tx.transaction.Account) {
      console.log('Updating sender balance');
      const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
      console.log('Balance:', balance)
      store.dispatch(updateBalance({ address: tx.transaction.Account, newBalance: RippleApi.dropsToXrp(parseFloat(balance) - parseFloat(tx.transaction.Amount)) }));
    }
    if (accounts[acnt].address === tx.transaction.Destination) {
      console.log('Updating the receiver balance');
      const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
      console.log('Balance:', balance)
      store.dispatch(updateBalance({ address: tx.transaction.Destination, newBalance: RippleApi.dropsToXrp(parseFloat(balance) + parseFloat(tx.transaction.Amount)) }));
    }
  }
  
}

