import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
 
import SwiperFlatList from 'react-native-swiper-flatlist';

const SwipeListView = ({ accounts }) => {
  return (
    <SwiperFlatList
      data={accounts}
      style={styles.wrapper}
      keyExtractor={ item => item.xAddress } 
      showPagination
      renderItem={({ item }) => {
        return (
          <View style={styles.slide}>
            <Text style={styles.currency}> {item.currency} </Text>
            <Text style={styles.address}> {item.xAddress} </Text>
            <Text style={styles.balance}> {item.balance} </Text>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create ({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  currency: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  address: {
    paddingHorizontal: '18%',
    color: 'black',
    fontSize: 12,
  },
  balance: {
    color: 'black',
    fontSize: 30,
  }
})

export default SwipeListView; 