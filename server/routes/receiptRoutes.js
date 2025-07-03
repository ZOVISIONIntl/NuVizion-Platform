const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createReceipt, downloadReceipt } = require('../controllers/receiptController');

// Generate a receipt (only for authorized users)
router.post('/generate', auth, createReceipt);

// Download a generated receipt by transaction ID (auth middleware inside controller)
router.get('/download/:txnId', auth, downloadReceipt);

module.exports = router;
 