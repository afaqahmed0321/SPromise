import axios from 'axios';
import { API_URL } from '../../helper';

const PasswordVerification = async (mail) => {
    const apiUrl = `${API_URL}/getOTP?emailID=${mail}&isForgot=${true}`;

    try {
        const response = await axios.get(apiUrl); 
        return response.data.code;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default PasswordVerification
