import express from 'express';
import aviationstack from './routes/flights.js';

const app = express();
const port = 8080;

app.use(express.json());

app.use('/flights', aviationstack);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`App started listening at http://localhost:${port}`);
});

