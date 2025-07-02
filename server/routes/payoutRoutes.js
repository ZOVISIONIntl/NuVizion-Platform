const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { requestPayout, getUserPayouts, getAllPayouts, updatePayoutStatus } = require('../controllers/payoutController');

// User requests a payout
router.post('/', auth, requestPayout);

// User views own payouts
router.get('/mine', auth, getUserPayouts);

// Admin views all payouts
router.get('/all', getAllPayouts); // You should add admin auth middleware here

// Admin approves/declines
router.put('/:id', updatePayoutStatus); // You should add admin auth middleware here

module.exports = router;
