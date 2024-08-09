import axios from 'axios';
import { API_URL } from '../../helper';
const getUserPromisbility = async (userN) => {
  try {
    const response = await axios.get(`${API_URL}/api/Users/getUserPromisbility?userNo=${userN}`
    );
    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
};

export default getUserPromisbility
