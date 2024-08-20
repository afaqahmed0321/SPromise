import axios from 'axios';
import { API_URL } from '../../../helper';

const TwitterApiCallLogin = async (userN) => {
  const apiUrl = `${API_URL}/twitter?userNo=`+userN;
  try {
    const response = await axios.get(apiUrl);
    return response.data.url ;
  } catch (error) {
    console.log(error)
  }
};

export default TwitterApiCallLogin;