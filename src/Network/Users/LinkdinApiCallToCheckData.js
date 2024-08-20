import axios from 'axios';
import { API_URL } from '../../../helper';

const LinkDinApiCallToCheckData = async (userN) => {
  const apiUrl = `${API_URL}/api/Users/checkLinkedIn?userNo=`+userN;
  try {
    const response = await axios.get(apiUrl);
    return response.data.code
  } catch (error) {
    console.log(error)
  }
};

export default LinkDinApiCallToCheckData;