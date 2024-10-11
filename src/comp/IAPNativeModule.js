import { NativeModules } from 'react-native';
const { IAPManager } = NativeModules;

export const fetchProducts = () => {
  IAPManager.fetchAvailableProducts();
};
