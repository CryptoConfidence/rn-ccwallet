import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}> {text} </Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  link: {
    marginVertical: 10,
    marginHorizontal: 30,
    color: 'blue',
  }
})

export default withNavigation(NavLink);