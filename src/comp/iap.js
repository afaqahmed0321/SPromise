// src/services/iap.js

import React, { useEffect, useState } from 'react';
import * as RNIap from 'react-native-iap';
import { Alert } from 'react-native';

const productIds = ['com.snappromise.app.premium', 'com.snappromise.premium_monthly'];

export const useIAP = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection();
        console.log("Attempting to fetch products with IDs:", productIds)
        const fetchedProducts = await RNIap.getProducts({skus: productIds});
        console.log("Fetched products:", fetchedProducts);
        
        if (fetchedProducts.length === 0) {
          Alert.alert('No Products Found', 'Please make sure the product IDs are correct and available in the app store.');
        }
        
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products: ', err);
        setError(err); 
        Alert.alert('Error', `Failed to fetch products: ${err.message || err}`);
      }
    };

    initIAP();

    return () => {
      RNIap.endConnection();
    };

  }, []);

  const purchaseProduct = async (productId) => {
    try {
      const purchase = await RNIap.requestPurchase(productId);
      handlePurchase(purchase);
    } catch (err) {
      console.error('Error purchasing product: ', err);
      Alert.alert('Purchase Error', `Failed to purchase product: ${err.message || err}`);
    }
  };

  const handlePurchase = (purchase) => {
    // Handle the successful purchase here (e.g., save to user account)
    Alert.alert('Purchase successful!', `You purchased: ${purchase.productId}`);
  };

  return { products, purchaseProduct, error }; // Return error state
};
