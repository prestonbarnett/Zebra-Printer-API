var express = require('express');
var router = express.Router();

const printService = require('../controllers/printController');

router.post('/print', printService.sendFile);

module.exports = router;