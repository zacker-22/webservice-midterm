import axios from "axios"
import dotenv from "dotenv"
import logger from "../logger/logger.js";

dotenv.config();
const API_KEY = process.env.AVIATION_API_KEY;
const AIRPORT_URL = `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}&limit=100&offset=`

async function binary_search_airport(airportCode){
    let response = await axios.get(AIRPORT_URL + 0);
    if(response.status != 200){
        return null;
    }
    let left = 0;
    let right = Math.floor(response.data.pagination.total/100);

    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        let response = await axios.get(AIRPORT_URL + mid*100);
        if(response.status != 200){
            return null;
        }
        if((response.data.data[0].iata_code <= airportCode) && (response.data.data[response.data.pagination.count - 1].iata_code >= airportCode)) {
            for(let i = 0; i < response.data.pagination.count; i++){
                if(response.data.data[i].iata_code == airportCode){
                    return response.data.data[i];
                }
            }

            return null;
        }
        else if(response.data.data[0].iata_code < airportCode){
            left = mid + 1;
        }
        else{
            right = mid - 1;
        }
    }

    

}

export const getAirport = async (airportCode) => {
    
    let data = null;
    try{
        logger.info(`Searching for airport with airportCode ${airportCode}`);
        data = await binary_search_airport(airportCode);
    }
    catch(err){
        logger.error(err, {airportCode: airportCode});
    }
  
    return data;
}