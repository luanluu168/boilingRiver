const      express = require('express');
const       router = express.Router();
const   postStripe = require('./stripe');

router.post('/payment/name=:name&phone=:phone&amount=:amount', postStripe); 

module.exports = router;