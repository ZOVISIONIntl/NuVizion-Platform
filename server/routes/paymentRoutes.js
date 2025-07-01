const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { subscribeAndPay } = require('../controllers/paymentController');

// Subscribers pay creators (subscription/payment)
router.post('/subscribe', auth, subscribeAndPay);

module.exports = router;

