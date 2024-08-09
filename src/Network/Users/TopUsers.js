

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../helper';

const TopUsers = async (userN) => {
  let user;
  while (!user) {
    user = await AsyncStorage.getItem("userNo");
  }
  const apiUrl = `${API_URL}/api/Users/getTopUsers?userNo=`+user  ;
  try {
    const response = await axios.get(apiUrl);
    const res = (response.data)
    return response.data.userRewards;
  } catch (error) {
    console.log(error)
  }
};

export default TopUsers;
