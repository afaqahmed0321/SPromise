import React, { useState } from 'react';
import { API_URL } from '../../helper';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLIC_KEY, Secret_key } from '../comp/Payment/helper';
import axios from 'axios';
import LoadingOverlay from '../comp/Global/LoadingOverlay';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { payVisible } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';

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
  }).then(response => response.json());
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
  const navigation = useNavigation();
  const { promiseID, userN, amount, setPayButton } = route.params;
  const [CardInput, setCardInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hidePayButton, setHidePayButton] = useRecoilState(payVisible);


  const handleBack = () => {
    setPayButton(true);
    navigation.goBack();
  };

  const onSubmit = async () => {
    if (CardInput.valid === false || typeof CardInput.valid === "undefined") {
      Toast.show({
        type: 'error',
        text1: 'Invalid Credit Card',
        visibilityTime: 3000, // 3 sec
        position: 'bottom',
      });
      return false;
    }
  
    let creditCardToken;
    try {
      setIsLoading(true);
      creditCardToken = await getCreditCardToken(CardInput);
      if (creditCardToken.error) {
        Toast.show({
          type: 'error',
          text1: 'Credit Card Token Error',
          visibilityTime: 3000, // 3 sec
          position: 'bottom',
        });
        setIsLoading(false);
        setPayButton(true);
        return;
      }
    } catch (e) {
      console.log("Error:", e);
      setIsLoading(false);
      setPayButton(true);
      return;
    }
  
    const { error } = await subscribeUser(creditCardToken);
    if (error) {
      Toast.show({
        type: 'error',
        text1: `${error}`,
        visibilityTime: 3000, // 3 sec
        position: 'bottom',
      });
      setIsLoading(false);
      setPayButton(true);
    } else {
      let payment_data = await charges();
      if (payment_data.status === 'succeeded') {
        setHidePayButton(true);
        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Payment Successful',
          visibilityTime: 3000, // 3 sec
          position: 'bottom',
        });
        navigation.goBack();
        const sourceID = payment_data?.source?.id;
        await axios.post(`${API_URL}/updatePaymentTransactionID?promiseID=${promiseID}&transactionID=${sourceID}`);
      } else {
        setIsLoading(false);
        setPayButton(true);
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          visibilityTime: 3000, // 3 sec
          position: 'bottom',
        });
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
          onChange={(data) => setCardInput(data)}
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
      <Toast ref={ref => Toast.setRef(ref)} />

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
