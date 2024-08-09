import axios from 'axios';
import { API_URL } from '../../../helper';

const addRemoveFavouriteAPi = async (Sn, Value) => {
    const apiLink = `${API_URL}/addRemoveFavourite`;
    const apiUrl = `${apiLink}?serialNo=${Sn}&isFavourite=${Value}`;

    try {
        const response = await axios.post(apiUrl);  
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export default addRemoveFavouriteAPi;
