

import axios from 'axios';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../helper';

const fetchNotification = async (userN) => {
  let user;
  while (!user) {
    user = await AsyncStorage.getItem("userNo");
  }
  const apiUrl = `${API_URL}/getUserNotifications?userNo=`+user;
  try {
    const response = await axios.get(apiUrl);
    return response.data.notificationsList;

  } catch (error) {
    
    ToastAndroid.showWithGravityAndOffset(
      "Unable to find the notificatio"+error,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,)

    return [];
  }
};

export default fetchNotification;
