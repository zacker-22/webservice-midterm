import express from 'express';
import {getFlight} from '../controllers/flightController.js';


const flight = express.Router();

flight.post('/', async (req, res) => {
    try{
        const flightNumber = req.body?.flightNumber;
        if (flightNumber == null || flightNumber == undefined || flightNumber == ""){
            res.status(400).send({error: "flightNumber is required"});
        }
        console.log(flightNumber);
        const response = await getFlight(flightNumber);
        if(response == null || response == undefined || JSON.stringify(response) === '{}'){
            res.status(400).send({error: `No flights found for flightNumber ${flightNumber}`});
            return;
        }
        res.status(200).send(response);
        
    }
    catch(err){

        console.log(err);
        res.status(400).send({error: err});
    }
});

export default flight;
