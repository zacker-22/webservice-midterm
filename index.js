import express from 'express';
import flight from './routes/flight.js';
import airport from './routes/airport.js';
import path from 'path';
import logger from './logger/logger.js';
import { userInfo } from 'os';


const app = express();
const port = process.env.PORT || 8080;
const __dirname = process.cwd();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// console.log(path.dirname);


app.use('/flight', flight);
app.use('/airport', airport);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
    logger.info("Request received for /", {userInfo: {ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress , userAgent: req.get('User-Agent')}});
});



app.listen(port, () => {
    console.log(`App started listening at http://localhost:${port}`);
});

