import RippleApi from '../connections/api/RippleAPI';
import { store } from '../redux/store';
import { setPreparedTxn, setSignedTxn, setTxnResult } from '../redux/TransactionActions';
import { State } from 'react-native-gesture-handler';

export const sendBasicXrpPayment = async (account, destinationAddress, amount) => {
  try {
    // Prepare Transaction JSON
    console.log('In Send XRP');

    const sender = account.xAddress;
    const preparedTx = await RippleApi.prepareTransaction(
      {
        TransactionType: 'Payment',
        Account: sender,
        Amount: RippleApi.xrpToDrops(amount), 
        Destination: destinationAddress,
      },
      {
        // Expire this transaction if it doesn't execute within ~1 minute:
        maxLedgerVersionOffset: 15,
      },
    );
    store.dispatch(setPreparedTxn(preparedTx)); // Update Store
    const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion;
    console.log('Prepared transaction instructions:', preparedTx.txJSON);
    console.log('Transaction cost:', preparedTx.instructions.fee, 'XRP');
    console.log('Transaction expires after ledger:', maxLedgerVersion);
    console.log('preparedTx.txJSON:',preparedTx.txJSON)

    // Sign Transaction using secret
    const response = RippleApi.sign(preparedTx.txJSON, account.secret);
    store.dispatch(setSignedTxn(response));  // Update Store
    
    const txID = response.id;
    console.log('Identifying hash:', txID);
    const txBlob = response.signedTransaction;
    console.log('Signed blob:', txBlob);

    // Submit transaction to ledger
    const latestLedgerVersion = await RippleApi.getLedgerVersion();

    const result = await RippleApi.submit(txBlob);
    store.dispatch(setTxnResult(result));  // Update Store

    console.log('Tentative result code:', result.resultCode);
    console.log('Tentative result message:', result.resultMessage);

    // Return the earliest ledger index this transaction could appear in
    // as a result of this submission, which is the first one after the
    // validated ledger at time of submission.
    const earliestLedgerVersion = latestLedgerVersion + 1;
    console.log('Earliest Ladger Version', earliestLedgerVersion);
  } catch (error) {
    console.log('Send XRP Error:', error)  
  }
}
