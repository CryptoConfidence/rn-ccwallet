import { store } from '../redux/store';
import RippleApi from '../connections/api/RippleAPI';
import { updateBalance } from '../redux/AccountActions';
import { setTxnResult } from '../redux/EscrowFinishActions';
import { addTransaction, addEscrowFinishTransaction } from '../redux/HistoricTransactionActions';

export const TransactionHandler = function (data) {
  console.log('New monitored transaction:', data)
  
  if (data.type === 'response') {
    console.log('Adding historic transactions response to store')
    
    const transactions = data.result.transactions
    //transactions.forEach((transaction) => {
    for (txn=transactions.length -1; txn >= 0; txn--) {
      if (transactions[txn].tx.TransactionType !== 'EscrowFinish') {
        // If it's a response the account is specified separately
        store.dispatch(addTransaction({ account: data.result.account, transaction: transactions[txn].tx }))
      } else {
        store.dispatch(addEscrowFinishTransaction({ transaction: transactions[txn].tx }))
      }
    }
  } else {
    console.log('Adding live transaction update to store')
    
    const state = store.getState();
    const accounts = state.account.accountList;
    
    for (acnt=0; acnt < accounts.length; acnt++) {
      if (data.transaction.TransactionType !== 'EscrowFinish') {
        // If the message is just a normal update you have to identify whether the account is source or destination
        if (accounts[acnt].address === data.transaction.Account) {
          store.dispatch(addTransaction({account: data.transaction.Account, transaction: data.transaction}))
        } 
        if (accounts[acnt].address === data.transaction.Destination) {
          store.dispatch(addTransaction({account: data.transaction.Destination, transaction: data.transaction}))
        }
      } else {
        // Handle the Escrow Finisg differently (combine it with the Escrow create)
        store.dispatch(addEscrowFinishTransaction({ transaction: transaction.tx }))
        // Update the escrow_Finish store (real time transaction updates)
        store.dispatch(setTxnResult(data))
      }
    }

    // Update Balance      
    for (acnt=0; acnt < accounts.length; acnt++) {
      // TODO Fix this logic - Should only update the balance for escrow transactions after the Finish arrives (currently does so on Escrow Create)
      // Note: Transaction Finish does not contain an amount
      if (accounts[acnt].address === data.transaction.Account && data.transaction.TransactionType !== "EscrowFinish") { 
        console.log('Updating sender balance');
        const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
        console.log('Balance:', balance)
        store.dispatch(updateBalance({ address: data.transaction.Account, newBalance: RippleApi.dropsToXrp(parseFloat(balance) - parseFloat(data.transaction.Amount)) }));
      }
      if (accounts[acnt].address === data.transaction.Destination && data.transaction.TransactionType !== "EscrowFinish") {
        console.log('Updating the receiver balance');
        const balance = RippleApi.xrpToDrops(accounts[acnt].balance);
        console.log('Balance:', balance)
        store.dispatch(updateBalance({ address: data.transaction.Destination, newBalance: RippleApi.dropsToXrp(parseFloat(balance) + parseFloat(data.transaction.Amount)) }));
      }
    }

  }
}
