require('dotenv').config();

const express = require("express");
const connectDB = require('./server/config/db');
const apiRouter = require('./server/routes/routes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`Label Printer API Started at Port ${process.env.PORT}`);
})