import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.AVIATION_API_KEY;

export const getFlight = async (flightNumber) => {
    let url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&limit=1`;
    let response = await axios.get(url);
    console.log(response.data);
    return response.data;
    
    
    
}

