


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchOnGoingPromises = async (userN) => {
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
  const apiUrl = 'https://snappromise.com:8080/getUserOngoingPromises?userNo='+user;

  try {
    const response = await axios.get(apiUrl);
    // console.log(response.data.promisesToMeList,"response.data.promisesTosMeList")
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchOnGoingPromises;
