import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { StripeProvider, confirmPayment, createPaymentMethod, useStripe } from '@stripe/stripe-react-native';
import { Auth_Token, STRIPE_PUBLIC_KEY, Secret_key } from '../comp/Payment/helper';


const PaymentScreen = ({ promiseID, userN }) => {
  console.log("this is promise IDDDDDD", promiseID);
  // console.log("this is Auth Token", Auth_Token);

  const [CardInput, setCardInput] = useState({});
  const [paymentIntent, setPaymentIntent] = useState('');

  const onSubmit = async () => {
    const promise = "4e8d1ffe-d6f8-4035-819f-e98197163e61"
    axios.post(`https://snappromise.com:8080/getPaymentIntent?promiseId=${promiseID}`)
      .then((response) => {
        console.log("This is the payment intent object", response.data.id);
        setPaymentIntent(response.data)
      })
      .catch((error) => {
        console.log("This is the error", error);
      });

      try {
        if (paymentIntent) {
            const paymentMethod = await createPaymentMethod({
                type: 'Card',
                card: {
                    number: '4242424242424242',
                    expMonth: '12', // Replace with the actual expiration month
                    expYear: '2023', // Replace with the actual expiration year
                    cvc: '123',
                },
                billingDetails: {
                    name: 'Afaq Ahmed', // Replace with the actual cardholder's name
                },
            });
    
            const confirmPaymentIntent = await confirmPayment(paymentIntent.clientSecret, {
                paymentMethod: {
                    type: 'Card',
                    card: paymentMethod.id,
                },
            });
    
            console.log("confirmPaymentIntent res++++", confirmPaymentIntent);
            alert("Payment successfully...!!!");
        }
    } catch (error) {
        console.log("Error raised during payment intent", error);
    }
  }

  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <View>
        {/* <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                onChange={(card) => setCardDetails(card)}
            /> */}
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
    </StripeProvider>
  );

};

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  inputStyle: {
    backgroundColor: '#222242',
    paddingLeft: 15,
    borderRadius: 5,
    color: '#fff'
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12
  },
  lognBtn: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(7),
    paddingHorizontal: 5,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  LogInButton: {
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold', // or 'normal', '600', '700', etc.
    color: 'white',
  }
});


export default PaymentScreen;
