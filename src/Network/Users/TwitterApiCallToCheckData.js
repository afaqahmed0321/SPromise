
import axios from 'axios';

const TwitterApiCallToCheckData = async (userN) => {
  const apiUrl = 'https://snappromise.com:8080/api/Users/checkTwitter?userNo='+userN;
  try {
    const response = await axios.get(apiUrl);
    return response.data.code
  } catch (error) {
    console.log(error)
  }
};

export default TwitterApiCallToCheckData;