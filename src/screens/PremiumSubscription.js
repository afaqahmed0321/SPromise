import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useIAP, requestSubscription, finishTransaction} from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';
import {err} from 'react-native-svg';

const subscriptionIds = [
  'com.snappromise.premium_monthly',
  'com.snappromise.app.premium',
]; // Replace with your subscription product IDs

export const PremiumSubscription = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [productList, setProductList] = useState(true);

  // Using the useIAP hook to initialize In-App Purchases
  const {
    connected,
    products,
    currentPurchase,
    currentPurchaseError,
    finishTransaction,
    getProducts,
    requestSubscription,
  } = useIAP();

  // Fetch available products (subscriptions) when the component mounts
  useEffect(async () => {
    if (connected) {
      const data = await getProducts({skus: subscriptionIds});
      console.log('connected', data);
      if (data == undefined || data == null || data == '') {
        setProductList(false);
      }
    }
  }, [connected]);

  // Listen to purchase updates
  useEffect(() => {
    if (currentPurchase) {
      handlePurchase(currentPurchase);
    }
  }, [currentPurchase]);

  const handlePurchase = async purchase => {
    try {
      setLoading(true);
      // Process the purchase on your backend or here
      await finishTransaction({
        purchase,
        isConsumable: false, // Subscription is not consumable
      });

      Alert.alert('Purchase Successful', 'Thank you for subscribing!');
      const response = await axios.post(``);
      // .then((response){
      //   console.alert(response);
      // })
      // .catch((error){
      //   console.alert(error);
      // })
    } catch (error) {
      console.error('Purchase Error', error);
      Alert.alert('Purchase Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async () => {
    try {
      setLoading(true);
      await requestSubscription({sku: subscriptionIds[0]});
    } catch (error) {
      console.error('Subscription Error', error);
      Alert.alert('Error', 'Subscription failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Card */}
      <LinearGradient
        colors={['#E4A936', '#EE8347']} // Gradient colors for the card
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.card} // Card gradient
      >
        {productList ? (
          <>
            <Text style={styles.title}>SnapPromise Monthly Subscription</Text>
            <Text style={styles.title}>
              Press suscribe button to confirm the subscription of $10
            </Text>
            {loading ? (
              <>
                {currentPurchaseError ? (
                  <Text style={styles.errorText}>
                    {currentPurchaseError ? currentPurchaseError.message : ''}
                  </Text>
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </>
            ) : (
              <TouchableOpacity onPress={subscribe}>
                <LinearGradient
                  colors={['#73B6BF', '#2E888C']} // Gradient colors for the button
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientButton} // Use gradientButton style
                >
                  <Text style={styles.gradientButtonText}>Subscribe Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        ):(
          <>
            <Text style={styles.title}>There are no active subscription from App Store, please contact customer support</Text>
          </>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background of the screen
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  gradientButtonText: {
    color: '#fff', // White text color for the button
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});
