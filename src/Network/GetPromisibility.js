import axios from 'axios';

const getUserPromisbility = async (userN) => {
  try {
    const response = await axios.get(`https://snappromise.com:8080/api/Users/getUserPromisbility?userNo=${userN}`
    );
    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
};

export default getUserPromisbility
