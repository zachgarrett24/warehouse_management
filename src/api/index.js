import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

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

export const getAllProducts = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        return data;      
    } catch (error) {
        throw error;
    }
};