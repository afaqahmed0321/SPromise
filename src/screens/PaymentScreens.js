import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { STRIPE_PUBLIC_KEY, Secret_key } from '../comp/Payment/helper';


const CURRENCY = 'USD';
var CARD_TOKEN = null;


function getCreditCardToken(creditCardData){
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLIC_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};

function subscribeUser(creditCardToken){
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
    // const [cardDetails, setCardDetails] = useState({});
    const [CardInput, setCardInput] = useState({})

    const onSubmit = async () => {
  
      if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
        alert('Invalid Credit Card');
        return false;
      }
  
      let creditCardToken;
      try {
        // Create a credit card token
        creditCardToken = await getCreditCardToken(CardInput);
        // console.log("creditCardToken", creditCardToken)
        if (creditCardToken.error) {
          alert("creditCardToken error");
          return;
        }
      } catch (e) {
        console.log("e",e);
        return;
      }
      // Send a request to your server with the received credit card token
      const { error } = await subscribeUser(creditCardToken);
      // Handle any errors from your server
      if (error) {
        alert(error)
      } else {
       
        let pament_data = await charges();
        console.log('pament_data', pament_data);
        if(pament_data.status == 'succeeded')
        {
          alert("Payment Successfully");
          console.log("this is id for send new funcion", pament_data.id);
        }
        else{
          alert('Payment failed');
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
            // Use the correct MIME type for your server
            Accept: 'application/json',
            // Use the correct Content Type to send data to Stripe
            'Content-Type': 'application/x-www-form-urlencoded',
            // Use the Stripe publishable key as Bearer
            Authorization: `Bearer ${Secret_key}`
          },
          // Use a proper HTTP method
          method: 'post',
          // Format the credit card data to a string of key-value pairs
          // divided by &
          body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&')
        }).then(response => response.json());
    };

    // const { initPaymentSheet, presentPaymentSheet } = useStripe();
    // const [loading, setLoading] = useState(false);

    // const fetchPaymentSheetParams = async () => {
    //     const response = await axios.post(`https://snappromise.com:8080/getPaymentIntent`, promiseID);
    //     console.log("reponse from payment Screen", response.data);
    //     const { clientSecret, id } = await response.json();

    //     return {
    //         clientSecret,
    //         id,
    //     };
    // };

    // const initializePaymentSheet = async () => {
    //     const {
    //         clientSecret,
    //         id,
    //     } = await fetchPaymentSheetParams();

    //     const { error } = await initPaymentSheet({
    //         merchantDisplayName: "Example, Inc.",
    //         customerEphemeralKeySecret: ephemeralKey,
    //         paymentIntentClientSecret: paymentIntent,
            
    //         allowsDelayedPaymentMethods: true,
    //         defaultBillingDetails: {
    //             name: 'Jane Doe',
    //         }
    //     });
    //     if (!error) {
    //         setLoading(true);
    //     }
    // };

    // const openPaymentSheet = async () => {
    //     const { error } = await presentPaymentSheet();

    //     if (error) {
    //         Alert.alert(`Error code: ${error.code}`, error.message);
    //     } else {
    //         Alert.alert('Success', 'Your order is confirmed!');
    //     }
    // };

    // useEffect(() => {
    //     initializePaymentSheet();
    // }, []);

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


export default PaymentScreens;
