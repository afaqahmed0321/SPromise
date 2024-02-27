

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopUsers = async (userN) => {
  let user;
  while (!user) {
    user = await AsyncStorage.getItem("userNo");
    console.log(user, "user in getonging", userN);
  }
  const apiUrl = 'https://snappromise.com:8080/api/Users/getTopUsers?userNo='+user  ;
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data,"aniqasss")
    const res = (response.data)
    
    return response.data.userRewards;

  } catch (error) {
    console.log(error)
  }
};

export default TopUsers;
