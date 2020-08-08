import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentTrackerScreen = ({ navigation, escrow_create, escrow_finish }) => {
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

      <Button style={styles.button} title='DONE' onPress={() => {
        navigation.navigate('Barcode')
      }} /> 
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
    paddingBottom: 5
  }
})

function mapStateToProps(state) {
  return {
    escrow_create: state.escrow_create,
    escrow_finish: state.escrow_finish
  }
}

export default connect(mapStateToProps)(PaymentTrackerScreen);