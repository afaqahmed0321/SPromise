import axios from 'axios';
import { API_URL } from '../../helper';

const VerifyOTP = async (email) => {
  const apiUrl = `${API_URL}/getOTP?emailID=`+email;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default VerifyOTP;
