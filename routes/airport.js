import express from 'express';
import {getAirport} from '../controllers/airportController.js';


const airport = express.Router();

/**
 * @api {post} /airport?airportCode= POST request to /airport
 * @apiName airport
 *
 * @RequestParam {String} airportCode The IANA airportCode of the airport to be searched
 *
 * @apiSuccess {Object} airport The airport object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
* "id": "4189",
* "gmt": "-8",
* "airport_id": "4189",
* "iata_code": "LAX",
* "city_iata_code": "LAX",
* "icao_code": "KLAX",
* "country_iso2": "US",
* "geoname_id": "5368418",
* "latitude": "33.943398",
* "longitude": "-118.40828",
* "airport_name": "Los Angeles International",
* "country_name": "United States",
* "phone_number": "310-646-5252",
* "timezone": "America/Los_Angeles"
 * }
 * @apiError (400) {Object} error The error object
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad Request
 *  {
 *  "error": "No airport found for airportCode LAX"
 * }
 * @apiError (400) {Object} error The error object
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 400 Bad Request
 * {
 * "error": "airportCode is required"
 * }
 * @apiError (400) {Object} error The error object
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 * {
 * "error": "Rate limit exceeded",
 * "message": "Too many requests, Only 5 allowed per minute"
 * }
 * 
 */
airport.post('/', async (req, res) => {
    try{
        const airportCode = req.body?.airportCode;
        if (airportCode == null || airportCode == undefined || airportCode == ""){
            res.status(400).send({error: "airportCode is required"});
        }
        
        const response = await getAirport(airportCode);
        
        if(response == null || response == undefined || JSON.stringify(response) === '{}'){

            res.status(400).send({error: `No airport found for airportCode ${airportCode}`});
            return;
        }

        res.status(200).send(response);
        
    }
    catch(err){
        console.log(err);
        res.status(400).send({error: err});
    }
});

export default airport;
