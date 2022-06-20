const utils = require('../utils/utils');
const fs = require('fs');

async function sendFile(params) {
    fs.readFile('inspection.zpl', (err, data) => {
        let dataStr = data.toString();
    
        dataStr.match(/(?<={{)(.*?)(?=}})/g).forEach((match) => {
            const pattern = new RegExp('({{)' + match + '(}})', 'g');
            let param = '';
            if (match in params) {
                param = params[match];
            } else if (match == 'DATE') {
                param = utils.getDate();
            }
            dataStr = dataStr.replace(pattern, param);
        });
    });

    return 'Test';
}

module.exports = {
    sendFile
}