import axios from 'axios';

const getUserPromisbility = async (userN) => {
  try {
    const response = await axios.get(`https://snappromise.com:8080/api/Users/getUserPromisbility?userNo=${userN}`
    );

    console.log('Response:', response.data.promisibility);
    return response.data.promisibility;

  } catch (error) {
    console.error('Error:', error);
  }
};

export default getUserPromisbility
