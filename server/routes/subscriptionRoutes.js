const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { subscribe, mySubscriptions, mySubscribers, cancel } = require('../controllers/subscriptionController');

router.post('/', auth, subscribe);                 // Subscribe
router.get('/mine', auth, mySubscriptions);        // My subscriptions
router.get('/mysubscribers', auth, mySubscribers); // My subscribers (for creators)
router.put('/cancel/:id', auth, cancel);           // Cancel

module.exports = router;
