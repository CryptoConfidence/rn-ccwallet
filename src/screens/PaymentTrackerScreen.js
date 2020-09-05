import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeTxn as removeEscrowCreateTxn } from '../redux/EscrowCreateActions';
import { removeTxn as removeEscrowFinishTxn } from '../redux/EscrowFinishActions';

const PaymentTrackerScreen = ({ navigation, escrow_create, escrow_finish, removeEscrowCreateTxn, removeEscrowFinishTxn }) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}> Payment Tracker </Text>

        <View style={styles.status_container}>
          <Text> Transaction Prepared </Text>
          { escrow_create.txnPrepared ?
            <Icon name="circle" style={[styles.complete, styles.icon]} />
            :
            <Icon name="circle" style={[styles.working, styles.icon]} />
          }
        </View>

        <View style={styles.status_container}>
          <Text> Transaction Signed </Text>
          { escrow_create.txnSigned ?
            <Icon name="circle" style={[styles.complete, styles.icon]} />
            :
            <Icon name="circle" style={[styles.working, styles.icon]} />
          }
        </View>

        <View style={styles.status_container}>
          <Text> Escrow Created </Text>
          { escrow_create.txnResult ?
            <Icon name="circle" style={[styles.complete, styles.icon]} />
            :
            <Icon name="circle" style={[styles.working, styles.icon]} />
          }
        </View>

        <View style={styles.status_container}>
          <Text> Payment Verified </Text>
          { escrow_finish.txnResult ?
            <Icon name="circle" style={[styles.complete, styles.icon]} />
            :
            <Icon name="circle" style={[styles.working, styles.icon]} />
          }
        </View>

        <View style={styles.status_container}>
          <Text> Payment Complete </Text>
          { escrow_finish.txnResult ?
            <Icon name="circle" style={[styles.complete, styles.icon]} />
            :
            <Icon name="circle" style={[styles.working, styles.icon]} />
          }
        </View>
      </View>

      <View style={styles.footer}>
        { escrow_create.txnResult !== null && escrow_create.txnResult.resultCode === 'tecNO_PERMISSION'  ?
          <View style={styles.error_container}>
            <Text style={styles.error}> Unable to submit escrow_create to XRPL  </Text> 
            <Text style={styles.error}> Error: {escrow_create.txnResult.resultCode} </Text>
          </View>
          :
          null
        }

        <Button style={styles.button} title='DONE' onPress={() => {
          removeEscrowCreateTxn()
          removeEscrowFinishTxn()
          navigation.navigate('Barcode')
        }}
        />
      </View>    
       
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EBF1F3'
  },
  main: {

  },
  header: {
    fontSize: 22,
    paddingTop: 5,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  status_container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },  
  icon: {
    fontSize: 20,
    paddingRight: 5
  },
  working: {
    color: 'orange'
  },
  complete: {
    color: 'green'
  },
  failed: {
    color: 'red'
  },
  button: {

  },
  error_container: {
    paddingBottom: 3
  },
  error: {
    paddingHorizontal: 10,
    color: 'red',
    fontSize: 12,
    fontWeight: '700'
  },
  footer: {
    paddingBottom: 2
  }
})

function mapStateToProps(state) {
  return {
    escrow_create: state.escrow_create,
    escrow_finish: state.escrow_finish
  }
}

export default connect(mapStateToProps, {removeEscrowCreateTxn, removeEscrowFinishTxn})(PaymentTrackerScreen);