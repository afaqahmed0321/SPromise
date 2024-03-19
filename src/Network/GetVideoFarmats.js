import axios from 'axios';

const GetAllowedVideoFormats = async () => {
  try {
    const response = await axios.get(
      'http://138.197.52.199:8080/api/Users/getAppSettings',
      {
        params: {
          tag: 'AllowedVideoFormats',
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
    console.error('Error fetching data: video for', error);
  }
};


export default GetAllowedVideoFormats;