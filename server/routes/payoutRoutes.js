const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const tier = require('../middleware/tier');
const { payout } = require('../controllers/payoutController');

// Only allow nuvizion or higher to request payout through funnel
router.post('/request', auth, tier('nuvizion'), payout);

module.exports = router;
