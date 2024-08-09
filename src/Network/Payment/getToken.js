
import axios from 'axios';
import { API_URL } from '../../../helper';
export const GetPaymentToken = () => {
  return axios.get(`${API_URL}/getPaymentToken`, {
    headers: {
      'Accept': '*/*',
    },
  })
  .then(response => response.data)
  .catch(error => {
    throw error; 
  });
};
