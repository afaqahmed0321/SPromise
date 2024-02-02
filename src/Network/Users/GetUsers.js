

import axios from 'axios';

const fetchUserData = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/getNetworkUsers?userNo='+userN;

  try {
    const response = await axios.get(apiUrl);
    return response.data.networkUsers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchUserData;
