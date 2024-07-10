import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLIC_KEY, Secret_key } from '../comp/Payment/helper';
import axios from 'axios';
import LoadingOverlay from '../comp/Global/LoadingOverlay';
import { pay } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { useRoute } from '@react-navigation/native';

const CURRENCY = 'USD';
var CARD_TOKEN = null;

function getCreditCardToken(creditCardData) {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_PUBLIC_KEY}`
    },
    method: 'post',
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
    then(response => response.json())
    .catch((error) => console.log(error))
};

function subscribeUser(creditCardToken) {
  return new Promise((resolve) => {
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const PaymentScreens = () => {

  const route = useRoute();
    const { promiseID, userN, amount ,payFalse} = route.params;
    console.log("pay", promiseID, userN, amount)
  const [CardInput, setCardInput] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [payButton, setPayButton] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };
  const onSubmit = async () => {

    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      ToastAndroid.show('Invalid Credit Card', ToastAndroid.LONG);

      return false;
    }

    let creditCardToken;
    try {
      setIsLoading(true);
      creditCardToken = await getCreditCardToken(CardInput);
      if (creditCardToken.error) {
        ToastAndroid.show('creditCardToken error', ToastAndroid.LONG);

        return;
      }
    } catch (e) {
      console.log("e", e);
      return;
    }
    const { error } = await subscribeUser(creditCardToken);
    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);

    } else {

      let pament_data = await charges();
      console.log("statussssss", pament_data)
      if (pament_data.status == 'succeeded') {
        setIsLoading(false);
        ToastAndroid.show('Payment Successfull.', ToastAndroid.LONG);
        payFalse(false);
        navigation.goBack();
        const sourseID = pament_data?.source?.id;
        console.log("this is id for send new funcion", sourseID);

        const dataa = {
          promiseID,
          sourseID
        }
        await axios.post(`https://snappromise.com:8080/updatePaymentTransactionID?promiseID=${promiseID}&transactionID=${sourseID}`)
          .then((response) => {
            console.log("IDs has been send to new API");
          })
          .catch((error) => {
            console.log("This is the error", error);
          });
      }
      else {
        setPayButton(true);
        setIsLoading(false);
        ToastAndroid.show('Payment Failed.', ToastAndroid.LONG);
      }
    }
  };

  const charges = async () => {

    const card = {
      'amount': amount * 100,
      'currency': CURRENCY,
      'source': CARD_TOKEN,
      'description': "Developers Sin Subscription"
    };

    console.log("cardddddd", card);


    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${Secret_key}`
      },
      method: 'post',
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json());
  };
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      {isLoading && <LoadingOverlay />}

      <View>
        <CreditCardInput
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          validColor="#fff"
          placeholderColor="#ccc"
          onChange={(data) => {
            setCardInput(data);
          }}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: hp(10) }}>
          <TouchableOpacity onPress={onSubmit}>
            <LinearGradient
              colors={['#E4A936', '#EE8347']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.lognBtn}
            >
              <Text style={styles.LogInButton}>Pay now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </StripeProvider>
  );

};

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'column',
    marginBottom: 10,
  },
  inputStyle: {
    backgroundColor: '#222242',
    paddingLeft: 15,
    borderRadius: 5,
    color: '#fff',
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: hp(1.2)
  },
  lognBtn: {
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),

  },
  LogInButton: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: 'white',
  }
});


export default PaymentScreens;
