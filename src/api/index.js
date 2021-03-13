import axios from 'axios';
const BASE_URL = '/';

export const loginUser = async ({username, password}) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/login`, {username, password});
        console.log("the response:", response)
        console.log("response token:", response.token)
        return response;
    } catch (error) {
        console.error(error);
    }
};