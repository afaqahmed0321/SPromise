

import axios from 'axios';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchNotification = async (userN) => {
  let user;
  while (!user) {
    if(userN=='')
    {
    user = await AsyncStorage.getItem("userNo");
    }
    else{
      user=userN
    }
    console.log(user, "user in getonging", userN);
  }
  const apiUrl = 'https://snappromise.com:8080/getUserNotifications?userNo='+user;
  // console.log(userN)
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data.notificationsList)
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
