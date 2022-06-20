const printService = require('../services/printService');

async function sendFile(req, res, next) {
    try {
        res.json(await printService.sendFile(req.body));
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

module.exports = {
    sendFile
}

// app.post('/', (req, res) => {
//     fs.readFile('inspection.zpl', (err, data) => {
//         let dataStr = data.toString();
    
//         dataStr.match(/(?<={{)(.*?)(?=}})/g).forEach((match) => {
//             const pattern = new RegExp('({{)' + match + '(}})', 'g');
//             let param = '';
//             if (match in req.body) {
//                 param = req.body[match];
//             } else if (match == 'DATE') {
//                 param = moment().format('MMMM Do YYYY, h:mm:ss a');
//             }
//             dataStr = dataStr.replace(pattern, param);
//         });

//         fs.writeFile('test.zpl', dataStr, (err) => {
//             let printData = new FormData();
//             printData.append('sn', 'D0N211900284');
//             printData.append('zpl_file', fs.createReadStream('test.zpl'));
    
//             axios({
//                 method: 'post',
//                 url: 'https://api.zebra.com/v2/devices/printers/send',
//                 data: printData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'apikey': process.env.API_KEY,
//                     'tenant': process.env.API_TENANT
//                 }
//             }).then(response => {
//                 return res.send(response.data);
//             }).catch(error => {
//                 return res.send(error.response.data);
//             });    
//         });
//     });
// });