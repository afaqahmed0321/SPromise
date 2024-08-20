

import axios from 'axios';
import { API_URL } from '../../../helper';

const fetchUserData = async (userN) => {
  const apiUrl = `${API_URL}/getNetworkUsers?userNo=`+userN;

  try {
    const response = await axios.get(apiUrl);
    return response.data.networkUsers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const removeUserNetwork = async (serialNo) => {
  const apiUrl = `${API_URL}/removeNetworkUser?serialNo=${serialNo}`;

  try {
    const response = await axios.post(apiUrl);
    return response;
  } catch (error) {
    console.log(error)
  }
}

export default fetchUserData;
