const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createDonationReceipt } = require('../controllers/receiptController');

// Only NuVizion and Covenant (Tier 2 and 3) can request receipts
router.post('/generate', auth, createDonationReceipt);

module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const path = require('path');
const Transaction = require('../models/Transaction');

// Download a generated receipt by transaction ID
router.get('/download/:txnId', auth, async (req, res) => {
  const txn = await Transaction.findById(req.params.txnId);
  if (!txn || !txn.receiptUrl) return res.status(404).json({ msg: 'Receipt not found' });

  // Only the subscriber or creator can download their receipt
  if (
    req.user.id !== txn.subscriber.toString() &&
    req.user.id !== txn.creator.toString()
  ) {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  res.download(txn.receiptUrl);
});

module.exports = router;
