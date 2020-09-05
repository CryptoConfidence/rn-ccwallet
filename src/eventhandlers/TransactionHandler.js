import { store } from '../redux/store';
import RippleApi from '../connections/api/RippleAPI';
import { updateBalance } from '../redux/AccountActions';
import { setTxnResult } from '../redux/EscrowFinishActions';
import { account_InfoRequest } from '../subscribers/AccountSubscribers';
import { addTransaction, addEscrowFinishTransaction, addEscrowCancelTransaction } from '../redux/HistoricTransactionActions';

export const TransactionHandler = function (data) {
  console.log('New monitored transaction:', data)
  
  if (data.type === 'response') {
    console.log('Adding historic transactions response to store')
    
    const transactions = data.result.transactions
    //transactions.forEach((transaction) => {
    for (txn=transactions.length -1; txn >= 0; txn--) {
      if (transactions[txn].tx.TransactionType !== 'EscrowFinish' 
        && transactions[txn].tx.TransactionType !== 'EscrowCancel' 
        && transactions[txn].meta.TransactionResult === 'tesSUCCESS') {
        // If it's a response the account is specified separately
        store.dispatch(addTransaction({ account: data.result.account, transaction: transactions[txn].tx }))
      } else {
        if (transactions[txn].tx.TransactionType === 'EscrowFinish') {
          store.dispatch(addEscrowFinishTransaction({ transaction: transactions[txn].tx }))
        } 
        if (transactions[txn].tx.TransactionType === 'EscrowCancel') {
          store.dispatch(addEscrowCancelTransaction({ transaction: transactions[txn].tx }))
        }
      }
    }
  } else {
    console.log('Adding live transaction update to store')
    
    const state = store.getState();
    const accounts = state.account.accountList;

    if (data.transaction.TransactionType === 'EscrowFinish') {
      store.dispatch(addEscrowFinishTransaction({ transaction: data.transaction }))
      // Update the escrow_Finish store (real time transaction updates)
      store.dispatch(setTxnResult(data))
    }

    if (data.transaction.TransactionType === 'EscrowCancel') {
      store.dispatch(addEscrowCancelTransaction({ transaction: data.transaction }))
      // Update the escrow_Finish store (real time transaction updates)
      store.dispatch(setTxnResult(data))
    }
    
    for (acnt=0; acnt < accounts.length; acnt++) {
      if (data.transaction.TransactionType !== 'EscrowFinish' 
        && data.transaction.TransactionType !== 'EscrowCancel'
        && data.meta.TransactionResult === 'tesSUCCESS') {
        // If the message is just a normal update you have to identify whether the account is source or destination
        if (accounts[acnt].address === data.transaction.Account) {
          store.dispatch(addTransaction({account: data.transaction.Account, transaction: data.transaction}))
        } 
        if (accounts[acnt].address === data.transaction.Destination) {
          store.dispatch(addTransaction({account: data.transaction.Destination, transaction: data.transaction}))
        }
      } 
    }

    // Update/Check Account (balance)
    for (acnt=0; acnt < accounts.length; acnt++) {
      if (accounts[acnt].address === data.transaction.Account || accounts[acnt].address === data.transaction.Destination) {
        account_InfoRequest(accounts[acnt].address);
      }
    }

    if (data.transaction.TransactionType === 'EscrowFinish') {
      transactions = state.history.transactionList;
      for (txn=0; txn < transactions.length; txn++) {
        if (transactions[txn].transactionDetails.Condition === data.transaction.Condition) {
          account_InfoRequest(transactions[txn].account);
        }
      }
    }
    
    /* // Update Balance      
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
    } */

  }
}
