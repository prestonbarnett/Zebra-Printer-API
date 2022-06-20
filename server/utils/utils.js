const moment = require('moment');

function getDate() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(str);
}  

module.exports = {
    getDate,
    validURL
}