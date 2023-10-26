import express from 'express';
import {getFlight} from '../controllers/flightController.js';
import {rateLimitMiddleware} from '../controllers/rateLimiter.js';
import logger from '../logger/logger.js';

const flight = express.Router();
flight.use(rateLimitMiddleware);

/**
 * @api {post} /flight/ POST request to /flight/
 * @apiName flight
 * @apiGroup Flight
 * @apiParam {String} flightNumber The flight number in IATA format
 * 
 * @apiSuccess {Object} flight The flight object
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *         "flightNumber": "AA123",
 *         "departureAirport": "LAX",
 *         "departureTime": "2023-10-18T23:20:00+00:00",
 *         "arrivalAirport": "JFK",
 *         "arrivalTime": "2023-10-19T06:00:00+00:00",
 *         "airline": "American Airlines",
 *         "aircraft": "777",
 *         "is_ground": false,
 *         "latitude": "40.639751",
 *         "longitude": "-73.778925",
 *         "altitude": "0"
 *      }
 * 
 * @apiError (400) {Object} The error object
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 * {
 *    "error": "No flights found for flightNumber AA123"
 * }
 * 
 * @apiError (400) {Object} The error object
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "flightNumber is required"
 * }
 * 
 * @apiError (400) {Object} The error object
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *      "error": "Rate limit exceeded",
 *      "message": "Too many requests, Only 5 allowed per minute"
 * }
 * 
 * 
 */

flight.post('/', async (req, res) => {
    logger.info("Request received for /flight", {userInfo: {ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress , userAgent: req.get('User-Agent')}});
    try{
        const flightNumber = req.body?.flightNumber;
        if (flightNumber == null || flightNumber == undefined || flightNumber == ""){
            logger.error("flightNumber is required", {meta: {flightNumber: flightNumber}});
            res.status(400).send({error: "flightNumber is required"});
        }
        console.log(flightNumber);
        const response = await getFlight(flightNumber);
        if(response == null || response == undefined || JSON.stringify(response) === '{}'){
            logger.error(`No flights found for flightNumber ${flightNumber}`, {meta: {flightNumber: flightNumber}});
            res.status(400).send({error: `No flights found for flightNumber ${flightNumber}`});
            return;
        }
        res.status(200).send(response);
        
    }
    catch(err){
        logger.error(err, {flightNumber: flightNumber});
        res.status(400).send({error: err});
    }
});

export default flight;
