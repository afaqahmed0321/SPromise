import axios from 'axios';

const PasswordVerification = async (mail) => {
    const apiUrl = `https://snappromise.com:8080/getOTP?emailID=${mail}&isForgot=${true}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.code;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default PasswordVerification
