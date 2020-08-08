import { PriceHandler } from "../../eventhandlers/PriceHandler";

var socket = null

export const xrpPriceFeedConnect = () => {
  socket = new WebSocket("wss://ws.bitstamp.net")
  socket.addEventListener("open", (event) => {
    // This callback runs when the connection is open
    console.log("Connected to Bitstamp!");
    do_subscribe();
  });
  socket.addEventListener("message", (event) => {
    PriceHandler(event.data)
  });
  socket.addEventListener("close", (event) => {
    // Use this event to detect when you have become disconnected
    // and respond appropriately.
    console.log("Disconnected...");
  });
}


async function do_subscribe() {
  const request = {
    "event": "bts:subscribe",
    "data": {
      "channel": "live_trades_xrpusd"
    }
  }
  socket.send(JSON.stringify(request))
}