

import axios from 'axios';

const FetchRewards = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/getNetworkUsersRewards?userNo='+userN;

  try {
    const response = await axios.get(apiUrl);
    console.log("response from reward service", response)
    return response.data.networkUsers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default FetchRewards;
