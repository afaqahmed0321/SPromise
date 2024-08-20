import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../helper';

const fetchOnGoingPromises = async (userN) => {
  let user;
  while (!user) {
    user = await AsyncStorage.getItem("userNo");
  }
  const apiUrl = `${API_URL}/getUserOngoingPromises?userNo=`+user;

  try {
    const response = await axios.get(apiUrl);
    return response.data.promisesToMeList;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchOnGoingPromises;
