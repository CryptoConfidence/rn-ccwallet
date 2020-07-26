import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" auto={false}/>
      <Input label="Password" value={password} onChangeText={setPassword} autoCapitalize="none" auto={false} secureTextEntry={true}/>
      { errorMessage ? <Text style={styles.errorMessage} >{errorMessage}</Text> : null }
      <Button title={submitButtonText} onPress={() => onSubmit({ email, password })}/>
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 15,
    color: 'red',
    marginLeft: 15
  },
})

export default AuthForm;