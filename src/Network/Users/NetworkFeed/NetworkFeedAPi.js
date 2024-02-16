import axios from 'axios';

const NetWorkFeedApi = async (networkUserNo) => {
  console.log(networkUserNo, "from networkAPI");
  // const apiUrl = `https://snappromise.com:8080/getUserNetworkFeed?userNo=${networkUserNo}&visibility=private`;

  await axios.get(`https://snappromise.com:8080/getUserNetworkFeed?userNo=${networkUserNo}&visibility=private`)
    .then((response) => {
      const data = response.data.promisesList; // Accessing the data property of the Axios response
      console.log(data, "Network Feed");
      return data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return null; // Returning null in case of an error, you can adjust this as needed
    })

};

export default NetWorkFeedApi;