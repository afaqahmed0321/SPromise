// import axios from 'axios';

// const GetUserData = async (userN) => {
//   console.log(userN)
//   const apiUrl = 'https://snappromise.com:8080/api/Users/getUsersData?userNo='+userN;

//   try {
//     const response = await axios.get(apiUrl);
//     const data = await response.json();
//     console.log(response)
//     return response;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };

// export default GetUserData;

import axios from 'axios';

const GetUserData = async (userN) => {
  console.log(userN);
  const apiUrl = 'https://snappromise.com:8080/api/Users/getUsersData?userNo=' + userN;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data; // Accessing the data property of the Axios response
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Returning null in case of an error, you can adjust this as needed
  }
};

export default GetUserData;
