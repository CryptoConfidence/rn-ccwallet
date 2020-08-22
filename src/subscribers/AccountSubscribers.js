import { store } from '../redux/store';
import { api_request } from '../connections/websockets/RippleWebSocket';

export const account_InfoRequest = async (account) => {
  console.log('Account Info requested called for account', account)
  const sub_response = await api_request({
    command: 'account_info',
    account: account,
    strict: 'true',
    ledger_index: 'current',
    queue: 'true'
  });
  if (sub_response.status === 'success') {
    console.log('Successfully requested account_info:', account);
  } else {
    console.error('Error requestinging to account_info:', account, ' - ', sub_response);
  }
}

export const account_HistRequest = async (account) => {
  console.log('Account history requested for account', account);
  const sub_response = await api_request({
    command: 'account_tx',
    account: account,
    ledger_index_min: -1,
    ledger_index_max: -1,
    binary: false,
    limit: 50,
    //limit: 5,
    forward: false  
  });
  if (sub_response.status === 'success') {
    console.log('Successfully requested history for account:', account);
  } else {
    console.error('Error requesting history for account:', account, ' - ', sub_response);
  }
} 

export const accountSubscribe = async (account) => {
  console.log('Account subscribe called for account', account);
  const sub_response = await api_request({
    command: 'subscribe',
    accounts: [account],
  });
  if (sub_response.status === 'success') {
    console.log('Successfully subscribed to account:', account);
  } else {
    console.error('Error subscribing to account:', account, ' - ', sub_response);
  }
}

export const xrplAccountSubscribe = () => {
  const state = store.getState();
  const accounts = state.account.accountList
   
  if (accounts.length !== 0) {
    accounts.forEach((account) => {
    console.log('Adding subscriber for account:', account)
     
    account_InfoRequest(account.address);
    account_HistRequest(account.address);
    accountSubscribe(account.address);
    })
  }
}
