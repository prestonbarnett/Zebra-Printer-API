var express = require('express');
var router = express.Router();

const printService = require('../controllers/printController');

// POST /print
// BODY {"printer", "<PRINTER SN>", Params...}
router.post('/print', printService.sendFile);

module.exports = router;