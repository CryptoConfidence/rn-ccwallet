import { api_request } from '../connections/websockets/RippleWebSocket';

export const accountSubscribe = async (account) => {
  console.log('Account subscribe called');
  const sub_response = await api_request({
    command: 'subscribe',
    accounts: [account],
  });
  if (sub_response.status === 'success') {
    console.log('Successfully subscribed to acount:', account);
  } else {
    console.error('Error subscribing to account:', account, ' - ', sub_response);
  }
}