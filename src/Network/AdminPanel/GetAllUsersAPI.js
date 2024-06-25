import axios from 'axios';

const getAllUsersForAdminPanelApi = () => {
  return axios.get('https://snappromise.com:8080/api/Users/getUsers', {
    headers: {
      Accept: 'text/plain',
    },
  })
    .then(response => {
      const data = response.data;
      return data;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw error;
    });
};

export default getAllUsersForAdminPanelApi;
