require('dotenv').config();

const fs = require('fs');

const moment = require('moment');
const FormData = require('form-data');
const axios = require('axios');
const express = require("express");

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    fs.readFile('inspection.zpl', (err, data) => {
        let dataStr = data.toString();
    
        dataStr.match(/(?<={{)(.*?)(?=}})/g).forEach((match) => {
            const pattern = new RegExp('({{)' + match + '(}})', 'g');
            let param = '';
            if (match in req.body) {
                param = req.body[match];
            } else if (match == 'DATE') {
                param = moment().format('MMMM Do YYYY, h:mm:ss a');
            }
            dataStr = dataStr.replace(pattern, param);
        });

        fs.writeFile('test.zpl', dataStr, (err) => {
            let printData = new FormData();
            printData.append('sn', 'D0N211900284');
            printData.append('zpl_file', fs.createReadStream('test.zpl'));
    
            axios({
                method: 'post',
                url: 'https://api.zebra.com/v2/devices/printers/send',
                data: printData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apikey': process.env.API_KEY,
                    'tenant': process.env.API_TENANT
                }
            }).then(response => {
                return res.send(response.data);
            }).catch(error => {
                return res.send(error.response.data);
            });    
        });
    });
});

app.post('/', (req, res) => {
    console.log(req);
    return res.send('POST');
});

app.listen(process.env.PORT, () => {
    console.log(`Label Printer API Started at Port ${process.env.PORT}`);
})