// Note: This is not used right now 
// There is a simple api call made on login (not safe, but okay for testing)

import RippleApi from '../api/RippleAPI';

const ConnectionHandler = () => {
  
  RippleApi.on("connected", (event) => {
    // This callback runs when the connection is open
    console.log("Connected!");
  });
  
  RippleApi.on("disconnected", (event) => {
    // Use this event to detect when you have become disconnected
    // and respond appropriately.
    if (code !== 1000) {
      console.log('Connection is closed due to error.');
    } else {
      console.log('Connection is closed normally.');
    };
  });

  return null
}

export default ConnectionHandler;
