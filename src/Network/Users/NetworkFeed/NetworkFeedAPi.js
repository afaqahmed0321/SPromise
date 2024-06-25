import axios from 'axios';

const NetWorkFeedApi = async (networkUserNo) => {

  await axios.get(`https://snappromise.com:8080/getUserNetworkFeed?userNo=${networkUserNo}&visibility=private`)
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