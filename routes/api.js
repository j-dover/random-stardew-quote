var express = require('express');
var router = express.Router();

var quoteController = require('../controllers/quoteController')

router.get('/quote/random', quoteController.getRandomQuote);
router.get('/quotes/random?', quoteController.getRandomNumQuotes);

module.exports = router;
