const ripple = require('ripple-lib');

const RippleApi = new ripple.RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233',
});

export default RippleApi;
