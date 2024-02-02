import axios from 'axios';

const addRemoveFavouriteAPi = async (Sn, Value) => {
    const apiLink = 'https://snappromise.com:8080/addRemoveFavourite';
    console.log(Sn, Value, 'SN & Value');
    const apiUrl = `${apiLink}?serialNo=${Sn}&isFavourite=${Value}`;

    try {
        const response = await axios.post(apiUrl);  // Corrected method name to post
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export default addRemoveFavouriteAPi;
