const utils = require('../utils/utils');
const shortid = require('shortid');

const URL = require('../models/urlModels');

const ERR_MSG = {
    "MISSING_URL": "Missing URL parameter in request body",
    "INVALID_URL": "Invalid URL"
};

async function getLongURL(params) {
    const urlID = params.id;
    const shortenedURL = await URL.findOne({ urlID });

    if (shortenedURL) {
        shortenedURL.clicks++;
        shortenedURL.save();
        return {'success': shortenedURL.longURL}
    };

    return {'message': ERR_MSG.INVALID_URL};
}

async function shortenURL(params) {
    const longURL = params.URL;
    if (!longURL) return {'message': ERR_MSG.MISSING_URL};
    if (!utils.validURL(longURL)) return {'message': ERR_MSG.INVALID_URL};

    const existingURL = await URL.findOne({ longURL });

    if (existingURL) return {'success': existingURL.urlID};

    const urlID = shortid.generate();

    const newURL = new URL({
        urlID: urlID,
        longURL: longURL,
        generatedBy: (params.generatedBy ? params.generatedBy : '')
    });

    await newURL.save();

    return {'success': newURL.urlID};
}

module.exports = {
    getLongURL,
    shortenURL
}