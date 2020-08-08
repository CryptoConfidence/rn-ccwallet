
const WSCloseConnectionHandler = (event) => {
  
  //console.log('Event:', event)
  if (code !== 1000) {
    console.log('Connection was closed due to error.', event.data);
  } else {
    console.log('Connection was closed normally.');
  }
  return null
}

export default WSCloseConnectionHandler;