const moment = require('moment');

async function getDate() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = {
    getDate
}