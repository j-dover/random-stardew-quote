var express = require('express');
var router = express.Router();

var quoteController = require('../controllers/quoteController')

router.get('/quote', quoteController.getRandomQuote);
router.get('/quotes', quoteController.getRandomNumQuotes);

module.exports = router;
