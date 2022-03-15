import express from 'express';
import ExternalApis from './modules/externalApis';
import cors from 'cors';
const app = express();
const externalApis = new ExternalApis();
require('dotenv').config()
app.use(cors());

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.get('/getDetail', async (req, res) => {
    const result = await externalApis.getIpDetails();
    res.json(result);
})

app.listen(process.env.PORT, () => {
    console.log(`The application is listening on port ${process.env.PORT}`);
})