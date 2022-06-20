const urlService = require('../services/urlService');

async function redirectURL(req, res, next) {
    try {
        const findUrl = await urlService.getLongURL(req.params);
        if (findUrl.success) {
            res.redirect(findUrl.success);
        } else {
            res.status(404).json('No URL Found');
        }
    } catch (err) {
        console.error('Cannot redirect to shortened URL', err.message);
        next(err);
    }
}

async function shortenURL(req, res, next) {
    try {
        res.json(await urlService.shortenURL(req.body));
    } catch(err) {
        console.error('Cannot shorten URL', err.message);
        next(err);
    }
}

module.exports = {
    redirectURL,
    shortenURL
}