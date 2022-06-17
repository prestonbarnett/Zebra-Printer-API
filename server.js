require('dotenv').config();

const express = require("express");

const app = express();

app.post('/', (req, res) => {
    console.log(req);
    return res.send('POST');
});

app.listen(process.env.PORT, () => {
	console.log(`Label Printer API Started at Port ${process.env.PORT}`);
})