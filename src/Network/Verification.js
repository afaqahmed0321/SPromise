

import axios from 'axios';

const VerifyOTP = async (email) => {
  const apiUrl = 'https://snappromise.com:8080/getOTP?emailID='+email;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default VerifyOTP;
