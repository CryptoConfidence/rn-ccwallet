import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import SwipeView from '../components/SwipeView';
//import SwipeListView from '../components/SwipeListView';

const ViewFundsScreen = ({ navigation, accounts }) => {
  return (
    <View style={styles.container}>
      <Header menuAction={() => navigation.toggleDrawer()} />   
      <View style={styles.swipecontainer}>
        <SwipeView accounts={accounts} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  }, 
  swipecontainer: {
    paddingHorizontal: '5%',
    paddingTop: 10,
    width: '100%',
    height: '50%',
  },
  swipeview: {
  }
})

function mapStateToProps(state) {
  return {
    accounts: state.account.accountList,
  }
}


export default connect(mapStateToProps)(ViewFundsScreen);