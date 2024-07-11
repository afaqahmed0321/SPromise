import React from 'react'

function pay() {
  return (
    <SafeAreaView style={{ height: '100%', width: wp(100) }}>
          <TouchableOpacity
            onPress={() => setIsPaymentWebViewVisible(false)}
            style={{
              marginLeft: wp(2),
              height: hp(5),
              marginTop: hp(1),
            }}>
            <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />
          </TouchableOpacity>
          <PaymentScreens promiseID={promiseID} userN={userN} amount={amount} handleCloseModal={handleCloseModal} />
        </SafeAreaView>
  )
}

export default pay