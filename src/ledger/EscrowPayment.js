import RippleApi from '../connections/api/RippleAPI';
import { store } from '../redux/store';
import { setPreparedTxn, setSignedTxn, setTxnResult } from '../redux/EscrowCreateActions';


const prepareEscrowCreate = async (senderAddress, receiverAddress, amount, cryptoCondition) => {
  const rippleOffset = 946684800; //Ripple Epoch (2000-01-01T00:00:00Z).
  const datetimenow = Date.now();
  console.log("TimeNow", datetimenow);
  console.log("Rippletime", datetimenow / 1000 - rippleOffset)
  const cancelAfter = Math.floor(datetimenow / 1000) + 5 * 60 - rippleOffset; // +5 minutes (Auto roll back)
  const finishAfter = Math.floor(datetimenow / 1000) + 3 - rippleOffset; // Current time + 3 second (Cannot complete before)
  console.log("Cancel After", cancelAfter);
  console.log("Finish After", finishAfter);

  const preparedTx = await RippleApi.prepareTransaction({
    Account: senderAddress,
    TransactionType: "EscrowCreate",
    Amount: RippleApi.xrpToDrops(amount), // Same as "Amount": "25000000"
    Destination: receiverAddress,
    CancelAfter: cancelAfter,
    FinishAfter: finishAfter,
    Condition: cryptoCondition
    //"DestinationTag": 23480,
    //"SourceTag": 11747,
    //Fee: 20,
  });
  console.log('PreparedTxn:', preparedTx)
  store.dispatch(setPreparedTxn(preparedTx)); // Update Store
  console.log("Prepared transaction instructions:", preparedTx.txJSON);

  
  const sequence = JSON.parse(preparedTx.txJSON).Sequence;
  console.log("Offer transaction sequence number:", sequence);

  return preparedTx.txJSON;
}


const signCreateTransaction = async (txJSON, secret) => {
  const response = RippleApi.sign(txJSON, secret);
  store.dispatch(setSignedTxn(response));  // Update Store

  const txCreateID = response.id;
  console.log("Identifying Create hash:", txCreateID);
  const txBlob = response.signedTransaction;
  console.log("Signed blob:", txBlob);
  return txBlob;
}

const submitTransaction = async (txBlob) => {
  const latestLedgerVersion = await RippleApi.getLedgerVersion();

  const result = await RippleApi.submit(txBlob);
  store.dispatch(setTxnResult(result));  // Update Store

  const earliestLedgerVersion = latestLedgerVersion + 1;
  console.log("Earliest ledger version", earliestLedgerVersion);
  console.log("Tentative Result:", JSON.stringify(result));

  return;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export const sendEscrowXrpPayment = async (account, destinationAddress, amount, condition) => {
  console.log('Account:', account)
  console.log('DestinationAddress:', destinationAddress)
  console.log('Amount:', amount)
  console.log('Condition:', condition)
  const txJSON_Create = await prepareEscrowCreate(account.xAddress, destinationAddress, amount, condition);
  const txBlob_Create = await signCreateTransaction(txJSON_Create, account.secret);
  await submitTransaction(txBlob_Create);
  
  /* var loopcnt = 1
  while (store.getState().escrow_create.txnResult.resultCode !== 'tesSUCCESS' && loopcnt < 10 )  {
    const txJSON_Create = await prepareEscrowCreate(account.xAddress, destinationAddress, amount, condition);
    const txBlob_Create = await signCreateTransaction(txJSON_Create, account.secret);
    await submitTransaction(txBlob_Create);
    await sleep(500);
    loopcnt++
  } */
  
}