import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Auth_Token, STRIPE_PUBLIC_KEY, Secret_key } from '../comp/Payment/helper';
import axios from 'axios';

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
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const PaymentScreens = ({ promiseID, userN, amount }) => {
  console.log("this is pro id", promiseID)
  const [CardInput, setCardInput] = useState({})

  const onSubmit = async () => {

    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;
    try {
      creditCardToken = await getCreditCardToken(CardInput);
      if (creditCardToken.error) {
        alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e", e);
      return;
    }
    const { error } = await subscribeUser(creditCardToken);
    if (error) {
      alert(error)
    } else {

      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if (pament_data.status == 'succeeded') {
        alert("Payment Successfully");
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
        alert('Payment failed');
      }
    }
  };

  const charges = async () => {

    const card = {
      'amount': amount,
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
        <View style={{flex:1, justifyContent:"center", alignItems:"center",  marginTop:hp(10)}}>
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.lognBtn}
        >
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.LogInButton}>Pay now</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    flexDirection: 'column', // Set flexDirection to 'column' for vertical alignment
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
    fontSize: 12
  },
  lognBtn: {
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),

  },
  LogInButton: {
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold', // or 'normal', '600', '700', etc.
    color: 'white',
  }
});


export default PaymentScreens;
