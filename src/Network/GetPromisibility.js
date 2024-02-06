import axios from 'axios';

const getUserPromisbility = async (userN) => {
  try {
    const response = await axios.get(
      'https://snappromise.com:8080/api/Users/getUserPromisbility',
      {
        params: {
          userNo: userN,
        },
        headers: {
          accept: 'text/plain',
        },
      }
    );

    console.log('Response:', response.data.promisibility);
    return  response.data.promisibility

  } catch (error) {
    // Handle error
    console.error('Error:', error);
  }
};

export default getUserPromisbility
