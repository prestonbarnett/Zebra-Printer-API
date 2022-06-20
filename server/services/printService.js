require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const urlService = require('../services/urlService');
const utils = require('../utils/utils');
const fs = require('fs').promises;
const createReadStream = require('fs').createReadStream;

const ERR_MSG = {
    "MISSING_PRINTER": "Missing Printer SN in request body",    
    "INVALID_URL": "Invalid URL"
};

async function sendFile(params) {
    // Catches
    if (!params.PRINTER) { return {'message': ERR_MSG.MISSING_PRINTER} };

    // If user has provided url parameter, use internal URL shortening API to shorten the
    // url before it is injected into the ZPL template. This prevents massive QR codes from
    // being generated if the URL is long.
    if (params.URL) {
        const shortenedURL = await urlService.shortenURL(params);
        if (shortenedURL.success) {
            params.URL = `${process.env.BASE_URI}/short/${shortenedURL.success}`;
        }
    }
    
    // Read template .zpl file into dataStr
    const dataStr = await fs.readFile('inspection.zpl', 'binary');
    let stringFile = await dataStr.toString();

    // Use regex to find all {{matches}} and replace with provided user parameters
    await stringFile.match(/(?<={{)(.*?)(?=}})/g).forEach((match) => {
        const pattern = new RegExp('({{)' + match + '(}})', 'g');
        let param = '';
        if (match in params) {
            param = params[match];
        } else if (match == 'DATE') {
            // If {{date}} is found, replace with current date
            param = utils.getDate();
        }
        stringFile = stringFile.replace(pattern, param);
    });
    
    // Create new file and write stringFile into new file
    await fs.writeFile('test.zpl', stringFile);

    // Create request to send to Zebra Data Services sendFileToPrinter API
    let printData = new FormData();
    printData.append('sn', params.PRINTER);
    printData.append('zpl_file', createReadStream('test.zpl'));

    // Make the API call
    try {
        const apiCall = await axios({
            method: 'post',
            url: 'https://api.zebra.com/v2/devices/printers/send',
            data: printData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'apikey': process.env.API_KEY,
                'tenant': process.env.API_TENANT
            }
        });
        
        if (apiCall.staus == 200) {
            return {'success': apiCall.data}
        } else {
            return {'message': apiCall.data}
        }
    } catch(err) {
        return err.response.data;
    }
}

module.exports = {
    sendFile
}