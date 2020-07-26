import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import PayWithCC from '../components/PayWithCC';

import { signup, clearErrorMessage } from '../redux/AuthActions';


const SignupScreen =  ( { errorMessage, signup, clearErrorMessage } ) => {
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage} 
      />

      <PayWithCC style={styles.logo} />

      <AuthForm style={styles.form}
        errorMessage={errorMessage}
        submitButtonText="Sign Up"
        onSubmit={({ email, password }) => signup({ email, password })}
      />

      <NavLink style={styles.nav}
        routeName="Signin"
        text="Already have an account? Sign in"
      />

    </View>
  )
}

SignupScreen.navigationOptions = () => {
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

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
})


export default connect(mapStateToProps, { signup, clearErrorMessage })(SignupScreen);