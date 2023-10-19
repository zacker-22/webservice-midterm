import express from 'express';
import {getFlight} from '../controllers/flightController.js';


const aviationstack = express.Router();
aviationstack.use(express.json());
aviationstack.post('/', async (req, res) => {
    try{
        const flightNumber = req.body.flightNumber;
        const response = await getFlight(flightNumber);

        
        
        res.status(200).send(response);
        
    }
    catch(err){
        // res.send(req.body)
        res.status(400).send({error: err});
        res.status(400).send({error: "flightNumber is required"});
    }
});

export default aviationstack;
