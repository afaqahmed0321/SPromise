import axios from 'axios';

const GetVideoSize = async () => {
  try {
    const response = await axios.get(
      'http://138.197.52.199:8080/api/Users/getAppSettings',
      {
        params: {
          tag: 'VideoSize',
        },
        headers: {
          accept: 'text/plain',
        },
      }
    );
    const res = response.data
    if (res.code == 200) {
        return res.appSettings
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


export default GetVideoSize;