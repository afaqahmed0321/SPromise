import axios from 'axios';
import { API_URL } from '../../../../helper';

const NetWorkFeedApi = async (networkUserNo) => {

  await axios.get(`${API_URL}/getUserNetworkFeed?userNo=${networkUserNo}&visibility=private`)
    .then((response) => {
      const data = response.data.promisesList; 
      return data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return null; 
    })

};

export default NetWorkFeedApi;