import axios from 'axios';

const AccountRemovedApiCall = async (userN, Platform) => {
  const apiUrl = `https://snappromise.com:8080/api/Users/removeSocialMediaAccount?userNo=${userN}&socialPlatform=${Platform}`;
  try {
    const response = await axios.post(apiUrl);
    return response.data.code;
  } catch (error) {
    console.error('API Request Error:', error);
  }
};

export default AccountRemovedApiCall;
