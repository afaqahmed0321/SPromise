import axios from 'axios';

const getAllUsersForAdminPanelApi = () => {
  return axios.get('https://snappromise.com:8080/api/Users/getUsers', {
    headers: {
      Accept: 'text/plain',
      // Add any additional headers here if needed
    },
  })
    .then(response => {
      // Assuming the API returns JSON, you can access the response data
      const data = response.data;
      console.log('API Response:', data);

      // Do something with the data here

      return data; // You can return data if needed
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw error; // Re-throw the error to let the calling code handle it
    });
};

// Call the function wherever you need it
export default getAllUsersForAdminPanelApi;
