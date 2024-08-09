import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_URL } from '../../../helper';
const fetchNotification = async () => {
  try {
    let userNo = await AsyncStorage.getItem("userNo");
    const apiUrl = `${API_URL}/getUserNotifications?userNo=${userNo}`;
    const response = await axios.get(apiUrl);
    return response.data.notificationsList;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    Toast.show({
      type: 'info',
      text1: `Unable to fetch notifications: ${error}`,
      visibilityTime: 3000, // 3 sec
      position: 'bottom',
    });
    return [];
  }
};

export default fetchNotification;
