import axios from 'axios';

const AccountRemovedApiCall = async (userN, Platform) => {
  const apiUrl = `https://snappromise.com:8080/api/Users/removeSocialMediaAccount?userNo=${userN}&socialPlatform=${Platform}`;

  console.log('Request Parameters:', userN, Platform);

  try {
    console.log('Try Case');
    const response = await axios.post(apiUrl);
    console.log('Response Data:', response.data);
    return response.data.code;
  } catch (error) {
    console.error('API Request Error:', error);
  }
};

export default AccountRemovedApiCall;
