

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

export const removeUserNetwork = async (serialNo) => {
  const apiUrl = `https://snappromise.com:8080/removeNetworkUser?serialNo=${serialNo}`;

  try {
    const response = await axios.post(apiUrl);
    console.log("removed response", response)
    return response;
  } catch (error) {
    console.log(error)
  }
}

export default fetchUserData;
