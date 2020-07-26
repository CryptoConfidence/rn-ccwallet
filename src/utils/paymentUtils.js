
export const parseBarcodeData = ( { barcodeData } ) => {
  console.log('Parsing:', barcodeData)
  payment = JSON.parse(barcodeData)
  console.log('Parsed Payment Object', payment)
  return payment
}