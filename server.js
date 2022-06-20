require('dotenv').config();

const express = require("express");
const connectDB = require('./server/config/db');
const urlRouter = require('./server/routes/urlRoutes');
const apiRouter = require('./server/routes/apiRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/', urlRouter);
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`Label Printer API Started at Port ${process.env.PORT}`);
})