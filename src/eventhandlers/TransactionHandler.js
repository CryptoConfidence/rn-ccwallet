import { store } from '../redux/store';
import RippleApi from '../connections/api/RippleAPI';
import { updateBalance } from '../redux/AccountActions';
import { setTxnResult } from '../redux/EscrowFinishActions';
import { addTransaction } from '../redux/HistoricTransactionActions';

export const TransactionHandler = function (data) {
  console.log('New monitored transaction:', data)

  if (data.type === 'response') {
    const transactions = data.result.transactions
    transactions.forEach((transaction) => {
      if (transaction.tx.TransactionType !== 'EscrowFinish') {
        console.log('Transaction:', transaction.tx)
        store.dispatch(addTransaction({account: data.result.account, transaction: transaction.tx}))
      }
    })
  } else {
    const state = store.getState();
    const accounts = state.account.accountList;

    // Add transaction to transaction history
    console.log('Add Transaction to history')
    for (acnt=0; acnt < accounts.length; acnt++) {
      console.log('Checking account:', accounts[acnt])
      console.log('Sending Account', data.transaction.Account)
      console.log('Receiving Account', data.transaction.Destination)
      if (accounts[acnt].address === data.transaction.Account) {
        store.dispatch(addTransaction({account: data.transaction.Account, transaction: data.transaction}))
      } 
      if (accounts[acnt].address === data.transaction.Destination) {
        store.dispatch(addTransaction({account: data.transaction.Destination, transaction: data.transaction}))
      }
    }

    // TODO Redirect this logic to AccountHandler (makes more sense to be there even if the message is a transaction) 
    if (data.transaction.TransactionType === "EscrowFinish") {
      store.dispatch(setTxnResult(data))
      
      // Don't update the receiver account until the escrow is finished
      // This logic is only necessary for a demo in which I want to show the receiver account in the app (would never really happen)
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
      if (accounts[acnt].address === data.transaction.Account && data.transaction.TransactionType !== "EscrowFinish") {
        console.log('Updating sender balance');
        const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
        console.log('Balance:', balance)
        store.dispatch(updateBalance({ address: data.transaction.Account, newBalance: RippleApi.dropsToXrp(parseFloat(balance) - parseFloat(data.transaction.Amount)) }));
      }
      if (accounts[acnt].address === data.transaction.Destination && (data.transaction.TransactionType !== "EscrowCreate" || data.transaction.TransactionType !== "EscrowFinish")) {
        console.log('Updating the receiver balance');
        const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
        console.log('Balance:', balance)
        store.dispatch(updateBalance({ address: data.transaction.Destination, newBalance: RippleApi.dropsToXrp(parseFloat(balance) + parseFloat(data.transaction.Amount)) }));
      }
    }   
  }
}

