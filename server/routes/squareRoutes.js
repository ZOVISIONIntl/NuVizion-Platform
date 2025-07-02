const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPayment } = require('../controllers/squareController');

router.post('/pay', auth, createPayment);

module.exports = router;
