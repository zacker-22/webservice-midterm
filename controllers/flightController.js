import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../logger/logger.js';
dotenv.config();

const API_KEY = process.env.AVIATION_API_KEY;

function reFormatResponse(data){
    let flightData = {
        flightNumber: data?.flight?.iata,
        departureAirport: data?.departure?.airport,
        departureTime: data?.departure?.scheduled,
        arrivalAirport: data?.arrival?.airport,
        arrivalTime: data?.arrival?.scheduled,
        airline: data?.airline?.name,
        aircraft: data?.aircraft?.iata,
        is_ground: data?.live?.is_ground,
        latitude: data?.live?.latitude,
        longitude: data?.live?.longitude,
        altitude: data?.live?.altitude,
    }
    return flightData;
}


export const getFlight = async (flightNumber) => {
    let url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&limit=1&flight_iata=${flightNumber}`;
    let response = await axios.get(url);
    let data = null;

    if(response.status == 200){
        try{
            data = reFormatResponse(response.data.data[0]);
            logger.info(`Flight data for flight ${flightNumber} retrieved successfully`, {flightNumber: flightNumber});
        }
        catch(err){
            logger.error(err, {flightNumber: flightNumber});
        }
    }
    
    return data;
}

