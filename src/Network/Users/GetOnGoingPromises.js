import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchOnGoingPromises = async (userN) => {
  let user;
  while (!user) {
    user = await AsyncStorage.getItem("userNo");
  }
  const apiUrl = 'https://snappromise.com:8080/getUserOngoingPromises?userNo='+user;

  try {
    const response = await axios.get(apiUrl);
    return response.data.promisesToMeList;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchOnGoingPromises;
