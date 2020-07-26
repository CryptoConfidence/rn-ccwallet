import { AccountHandler } from '../../eventhandlers/AccountHandler';

var socket = null;

const AWAITING = {};
const handleResponse = function (data) {
  if (!data.hasOwnProperty("id")) {
    console.error("Got response event without ID:", data);
    return;
  }
  if (AWAITING.hasOwnProperty(data.id)) {
    AWAITING[data.id].resolve(data);
  } else {
    console.error("Response to un-awaited request w/ ID " + data.id);
  }
};

const WS_HANDLERS = {
  response: handleResponse,
  ["transaction"]: AccountHandler,
  // Fill this out with your handlers in the following format:
  // "type": function(event) { /* handle event of this type */ }
};

export const websocketConnect = () => {
  socket = new WebSocket("wss://s.altnet.rippletest.net:51233");
  socket.addEventListener("open", (event) => {
    console.log("WebSocket Connected!");
  });
  socket.addEventListener("message", (event) => {
    const parsed_data = JSON.parse(event.data);
    if (WS_HANDLERS.hasOwnProperty(parsed_data.type)) {
      // Call the mapped handler
      WS_HANDLERS[parsed_data.type](parsed_data);
    } else {
      console.log("Unhandled message from server", event);
    }
  });
  socket.addEventListener("close", (event) => {
    if (code !== 1000) {
      console.log('Connection was closed due to error.', event.data);
    } else {
      console.log('Connection was closed normally.');
    }
  });
} 

let autoid_n = 0;
export const api_request = (options) => {
  if (!options.hasOwnProperty('id')) {
    options.id = 'autoid_' + autoid_n++;
  }

  let resolveHolder;
  AWAITING[options.id] = new Promise((resolve, reject) => {
    // Save the resolve func to be called by the handleResponse function later
    resolveHolder = resolve;
    try {
      // Use the socket opened in the previous example...
      socket.send(JSON.stringify(options));
    } catch (error) {
      reject(error);
    }
  });
  AWAITING[options.id].resolve = resolveHolder;
  return AWAITING[options.id];
}

  