import { store } from '../redux/store';
import RippleApi from '../connections/api/RippleAPI';
import { updateBalance } from '../redux/AccountActions';
import { setTxnResult } from '../redux/EscrowFinishActions';

export const TransactionHandler = function (tx) {
  console.log('New monitored transaction:', tx)
  
  const state = store.getState();
  const accounts = state.account.accountList;

  if (tx.transaction.TransactionType === "EscrowFinish") {
    store.dispatch(setTxnResult(tx))
    
    // This logic is only necessary for a demo in which I want to show the receiver account in the app
    const escrowAmount = state.escrow_create.txnResult.tx_json.Amount
    console.log('EscrowAmount:', escrowAmount)
    const beneficiaryAccount = state.escrow_create.txnResult.tx_json.Destination
    console.log('Destination:', beneficiaryAccount)
    for (acnt=0; acnt < accounts.length; acnt++) {
      console.log('AccountAddress:', accounts[acnt].address)
      if (accounts[acnt].address === beneficiaryAccount) {
        console.log('EscrowAmount:', escrowAmount)
        console.log('Account Balance:', accounts[acnt].balance)
        store.dispatch(updateBalance({ address: beneficiaryAccount, newBalance: RippleApi.dropsToXrp(parseFloat(escrowAmount) + (parseFloat(accounts[acnt].balance) * 1000000)) }));
      }
    }
  }

    
  for (acnt=0; acnt < accounts.length; acnt++) {
    //console.log('In for loop - stateAddress:', accounts[acnt].address, ' txAddress:', tx.transaction.Account, ' txDestination:', tx.transaction.Destination)
    if (accounts[acnt].address === tx.transaction.Account && tx.transaction.TransactionType !== "EscrowFinish") {
      console.log('Updating sender balance');
      const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
      console.log('Balance:', balance)
      store.dispatch(updateBalance({ address: tx.transaction.Account, newBalance: RippleApi.dropsToXrp(parseFloat(balance) - parseFloat(tx.transaction.Amount)) }));
    }
    if (accounts[acnt].address === tx.transaction.Destination && (tx.transaction.TransactionType !== "EscrowCreate" || tx.transaction.TransactionType !== "EscrowFinish")) {
      console.log('Updating the receiver balance');
      const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
      console.log('Balance:', balance)
      store.dispatch(updateBalance({ address: tx.transaction.Destination, newBalance: RippleApi.dropsToXrp(parseFloat(balance) + parseFloat(tx.transaction.Amount)) }));
    }
  }
  
}

