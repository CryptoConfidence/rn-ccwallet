import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import SwipeView from '../components/SwipeView';
import Moment from 'moment';
import RippleApi from '../connections/api/RippleAPI';
import Icon from 'react-native-vector-icons/Ionicons';

Moment.locale('en')

const ViewFundsScreen = ({ navigation, accounts, transactions }) => {

  const [activeAccount, setActiveAccount] = useState(accounts[0]);

  const transactionCompare = (a, b) => {
    return b.transactionDetails.inLedger - a.transactionDetails.inLedger;
    //return a.transactionDetails.inLedger - b.transactionDetails.inLedger; 
  }

  const filterTransactionsByAccount = (transaction) => {
    if (transaction.account === activeAccount.address) {
      return true
    } else {
      return false
    }
  }
  
  const getTransactions = () => {
    return transactions.sort(transactionCompare).filter(transaction => filterTransactionsByAccount(transaction))
  }

  const renderPaymentStatus = (item) => {
    //console.log('Item:', item)
    if (item.hasOwnProperty('FinishDetails')) {
      if (item.FinishDetails.TransactionType === 'EscrowFinish') {
        return <Text style={styles.transaction_type}>Secure Payment - Complete </Text>
      } else {
        return <Text style={styles.transaction_type}>Secure Payment - Rejected </Text>
      }
    } else {
      return <Text style={styles.transaction_type}>Secure Payment - Pending </Text>
    }  
  }

  /* useEffect(() => {
    transactions.sort(transactionCompare)
  }, []) */

  return (
    <View style={styles.container}>
      <Header menuAction={() => navigation.toggleDrawer()} />   
      <View style={styles.swipecontainer}>
        <SwipeView accounts={accounts} setActiveAccount={setActiveAccount} />
      </View>
      <View style={styles.flatlist_container}>
        <FlatList 
          data={getTransactions()}
          keyExtractor={item => item.transactionDetails.hash}
          renderItem={({ item }) => {
            return (
              <View style={styles.listitem}>
                <View style={styles.direction}>
                { activeAccount.address === item.transactionDetails.Account ? 
                  <Icon name='arrow-forward-outline' size={30} color='red'/>
                  :
                  <Icon name='arrow-back-outline' size={30} color='blue'/>
                }
                </View>
                <View style={styles.details}>
                  { item.transactionDetails.TransactionType === 'Payment' ?
                    <Text style={styles.transaction_type}>Regular Payment </Text>
                    :
                    renderPaymentStatus(item)
                  }
                  { activeAccount.address === item.transactionDetails.Account ? 
                    <Text style={styles.counterpart}>Receiver: {item.transactionDetails.Destination}</Text>
                    :
                    <Text style={styles.counterpart}>Sender: {item.transactionDetails.Account}</Text>
                  }
                </View>
                
                <View style={styles.final}>
                  <Text style={styles.date}> { Moment(new Date((item.transactionDetails.date + 946684800) * 1000)).format('Do MMM yyyy') } </Text>
                  { activeAccount.address === item.transactionDetails.Account ? 
                    <Text style={styles.amount_out}> {parseFloat(RippleApi.dropsToXrp(item.transactionDetails.Amount)).toFixed(2)} XRP </Text>
                    :
                    <Text style={styles.amount_in}> {parseFloat(RippleApi.dropsToXrp(item.transactionDetails.Amount)).toFixed(2)} XRP </Text>
                  }
                </View>
              </View>
            )
            }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#EBF1F3',
    flex: 1,
  }, 
  swipecontainer: {
    paddingHorizontal: '5%',
    paddingTop: 10,
    width: '100%',
    height: '45%',
    borderRadius: 30,
    paddingBottom: 10
  },
  flatlist_container: {
    flex: 1
  },
  listitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  direction: {
    width: '10%',
    alignSelf: 'center'
    //borderColor: 'green',
    //borderWidth: 1
  },
  details: {
    width: '60%',
    //borderColor: 'blue',
    //borderWidth: 1
  },
  final: {
    justifyContent: 'space-between',
    width: '27%',
    //borderWidth: 1,
    //borderColor: 'red'
  },
  transaction_type: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  counterpart: {
    fontSize: 14,
  },
  date: {
    alignSelf: 'flex-end',
  },
  amount_in: {
    alignSelf: 'flex-end',
    paddingBottom: 4,
    fontSize: 16,
    color: 'blue'
  },
  amount_out: {
    alignSelf: 'flex-end',
    paddingBottom: 4,
    fontSize: 16,
    color: 'red'
  }
})

function mapStateToProps(state) {
  return {
    accounts: state.account.accountList,
    transactions: state.history.transactionList,
  }
}


export default connect(mapStateToProps)(ViewFundsScreen);