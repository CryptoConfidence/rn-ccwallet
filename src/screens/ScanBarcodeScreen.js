import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { addPaymentDetails } from '../redux/PaymentActions';

const ScanBarcodeScreen = ({ navigation, addPaymentDetails }) => {
  return (
    <View style={styles.container}>
      <RNCamera 
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            barcodes.forEach(item => {
              console.log('Barcode identified')
              if (item.type === 'QR_CODE') {
                console.log('Identified QRCODE', item.data)
                addPaymentDetails(item.data);
                navigation.navigate('Confirm');
              }
            })  
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1F3' 
  },
  camera: {
    height: '90%',
    width: '100%',
  }
})

export default connect(null,{addPaymentDetails})(ScanBarcodeScreen);