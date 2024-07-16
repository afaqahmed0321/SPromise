import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const fetchNotification = async () => {
  try {
    let userNo = await AsyncStorage.getItem("userNo");
    const apiUrl = `https://snappromise.com:8080/getUserNotifications?userNo=${userNo}`;
    const response = await axios.get(apiUrl);
    return response.data.notificationsList;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    Toast.show({
      type: 'error',
      text1: `Unable to fetch notifications: ${error}`,
      visibilityTime: 3000, // 3 sec
      position: 'bottom',
    });
    return [];
  }
};

export default fetchNotification;
