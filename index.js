import express from 'express';
import flight from './routes/flight.js';
import airport from './routes/airport.js';
import {rateLimitMiddleware} from './controllers/rateLimiter.js';

const app = express();
const port = process.env.PORT || 8080;
app.use(rateLimitMiddleware);
app.use(express.json());

app.use('/flight', flight);
app.use('/airport', airport);
app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(port, () => {
    console.log(`App started listening at http://localhost:${port}`);
});

