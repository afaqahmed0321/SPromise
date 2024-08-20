import axios from 'axios';
import { API_URL } from '../../../../helper';

const AccountRemovedApiCall = async (userN, Platform) => {
  const apiUrl = `${API_URL}/api/Users/removeSocialMediaAccount?userNo=${userN}&socialPlatform=${Platform}`;
  try {
    const response = await axios.post(apiUrl);
    return response.data.code;
  } catch (error) {
    console.error('API Request Error:', error);
  }
};

export default AccountRemovedApiCall;
