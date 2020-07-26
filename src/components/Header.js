import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ( { menuAction, connectionStatus } ) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => menuAction()}>
        <Text style={styles.text}> CC </Text>
      </TouchableOpacity>
      { connectionStatus ?
        <Icon name="circle" style={[styles.connected, styles.icon]} />
        :
        <Icon name="circle" style={[styles.disconnected, styles.icon]} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 30
  },
  icon: {
    fontSize: 24,
    paddingTop: 5,
    paddingRight: 5
  },
  connected: {
    color: 'green'
  },
  disconnected: {
    color: 'red'
  }
})

function mapStateToProps(state) {
  return {
    connectionStatus: state.xrp.isConnected,
  }
}

export default connect(mapStateToProps)(Header);

