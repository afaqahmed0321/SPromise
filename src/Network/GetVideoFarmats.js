import axios from 'axios';

const GetAllowedVideoFormats = async () => {
  try {
    const response = await axios.get(
      'https://snappromise.com:8080/api/Users/getAppSettings',
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
    // console.log(res, " GetAllowedVideoFormats Api response");
    if (res.code == 200) {
        return res.appSettings
    }
  } catch (error) {
    console.error('Error fetching data: video for', error);
  }
};


export default GetAllowedVideoFormats;