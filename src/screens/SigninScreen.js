import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import PayWithCC from '../components/PayWithCC';

import { signin, clearErrorMessage } from '../redux/AuthActions';
import { ledgerConnect } from '../redux/XRPActions';


const SigninScreen =  ( { errorMessage, signin, clearErrorMessage, ledgerConnect } ) => {
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage} 
      />

      <PayWithCC style={styles.logo} />

      <AuthForm style={styles.form}
        errorMessage={errorMessage}
        submitButtonText="Sign In"
        onSubmit={({ email, password }) => {
          ledgerConnect()
          signin({ email, password })
        }}
      />

      <NavLink style={styles.nav}
        routeName="Signup"
        text="Don't have an account? Sign up"
      />
      
    </View>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1F3' 
  },
  logo: {
    marginBottom: 5
  }
})

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  }
}

//function mapDispatchToProps(dispatch) {
//  return {
//    signin: () => dispatch(signin())
//  }
//}

export default connect(mapStateToProps, { signin, clearErrorMessage, ledgerConnect } )(SigninScreen);