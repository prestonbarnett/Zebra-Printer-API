var express = require('express');
var router = express.Router();

const urlService = require('../controllers/urlController');

// GET /short/<Shortened URL>
router.get('/short/:id', urlService.redirectURL);

// POST /shortenLink
// BODY {"url": "<Long URL>"}
router.post('/shorten', urlService.shortenURL);

module.exports = router;