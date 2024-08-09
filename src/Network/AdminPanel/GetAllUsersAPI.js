import axios from 'axios';
import { API_URL } from '../../../helper';
const getAllUsersForAdminPanelApi = () => {
  return axios.get(`${API_URL}/api/Users/getUsers`, {
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
