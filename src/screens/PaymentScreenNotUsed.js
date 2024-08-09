import React, { useEffect, useState } from 'react';
import { API_URL } from '../../helper';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { StripeProvider, confirmPayment, createPaymentMethod, useStripe } from '@stripe/stripe-react-native';
import { Auth_Token, STRIPE_PUBLIC_KEY, Secret_key } from '../comp/Payment/helper';


const PaymentScreen = ({ promiseID, userN }) => {
  const [CardInput, setCardInput] = useState({});
  const [paymentIntent, setPaymentIntent] = useState('');

  const onSubmit = async () => {
    const promise = "4e8d1ffe-d6f8-4035-819f-e98197163e61"
    axios.post(`${API_URL}/getPaymentIntent?promiseId=${promiseID}`)
      .then((response) => {
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
                    expMonth: '12',                     expYear: '2023',                    cvc: '123',
                },
                billingDetails: {
                    name: 'Afaq Ahmed', 
                },
            });
    
            const confirmPaymentIntent = await confirmPayment(paymentIntent.clientSecret, {
                paymentMethod: {
                    type: 'Card',
                    card: paymentMethod.id,
                },
            });
                alert("Payment successfully...!!!");
        }
    } catch (error) {
        console.log("Error raised during payment intent", error);
    }
  }

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
    fontSize: hp(1.5)
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
    fontSize: hp(1.6), 
    fontWeight: 'bold', 
    color: 'white',
  }
});


export default PaymentScreen;
