import { store } from '../redux/store';
import { api_request } from '../connections/websockets/RippleWebSocket';

export const accountSubscribe = async (account) => {
  console.log('Account subscribe called');
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

export const account_infoSubscribe = async (account) => {
  console.log('Account Info subscribe called')
  const sub_response = await api_request({
    command: 'account_info',
    account: account,
    strict: 'true',
    ledger_index: 'current',
    queue: 'true'
  });
  if (sub_response.status === 'success') {
    console.log('Successfully subscribed to account_info:', account);
  } else {
    console.error('Error subscribing to account_info:', account, ' - ', sub_response);
  }
}

export const xrplAccountSubscribe = async () => {
  const state = store.getState();
  const accounts = state.account.accountList

  accounts.forEach((account) => {
    console.log('Adding subscriber for account:', account)
    
    account_infoSubscribe(account.address);
    accountSubscribe(account.address);
  })
}

