import express from 'express';
import trackship from './routes/flights.js';

const app = express();
const port = 8080;



app.use('/flights', trackship);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

