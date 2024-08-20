

import axios from 'axios';
import { API_URL } from '../../../helper';

const fetchUserData = async (userno) => {
  const apiUrl = `${API_URL}/api/Users/getUsersData?userNo=`+userno;

  try {
    const response = await axios.get(apiUrl);
    if(response.data==null)
    {
      return "User Does not Exist";

    }
    else{
      return response.data;

    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchUserData;
