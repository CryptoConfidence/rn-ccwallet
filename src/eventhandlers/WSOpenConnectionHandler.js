//import { store } from '../redux/store';
import { accountSubscribe } from '../subscribers/AccountSubscribers';

const WSOpenConnectionHandler = (event) => {
  
  //console.log('Event:', event)
  console.log("WebSocket Connected!");
  //const state = store.getState();
  //const accounts = state.account.accountList

  //accounts.forEach((account) => {
  //  console.log('Adding subscriber for account:', account)
  //  
  //  account_infoSubscribe(account.address);
  //  accountSubscribe(account.address);
  //})


  return null
}

export default WSOpenConnectionHandler;
