import axios from 'axios';
import { API_URL } from '../../../helper';

const GetUserData = async (userN) => {
  const apiUrl = `${API_URL}/api/Users/getUsersData?userNo=` + userN;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data; 
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; 
  }
};

export default GetUserData;
