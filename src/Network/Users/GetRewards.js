

import axios from 'axios';
import { API_URL } from '../../../helper';

const FetchRewards = async (userN) => {
  const apiUrl =  `${API_URL}/api/Users/getNetworkUsersRewards?userNo=`+userN;

  try {
    const response = await axios.get(apiUrl);
    return response.data.networkUsers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default FetchRewards;
