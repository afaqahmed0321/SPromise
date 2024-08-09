import axios from 'axios';
import { API_URL } from '../../../helper';

const LinkDinApiCallLogin = async (userN) => {
  const apiUrl = `${API_URL}/linkedInSignIn?userNo=`+userN;
  try {
    const response = await axios.get(apiUrl);
    return response.data.url ;
  } catch (error) {   
    console.log(error)
    // return [];
  }
};

export default LinkDinApiCallLogin;