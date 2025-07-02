const express = require('express');
const router = express.Router(); // not Routes!
const auth = require('../middleware/auth');
const { createDonationReceipt } = require('../controllers/receiptController');
const path = require('path');
const Transaction = require('../models/Transaction');

// Only NuVizion and Covenant (Tier 2 and 3) can request receipts
router.post('/generate', auth, createDonationReceipt);

// Download a generated receipt by transaction ID
router.get('/download/:txnId', auth, async (req, res) => {
  try {
    const txn = await Transaction.findById(req.params.txnId);
    if (!txn || !txn.receiptUrl) {
      return res.status(404).json({ msg: 'Receipt not found' });
    }

    // Only the subscriber or creator can download their receipt
    if (
      req.user.id !== txn.subscriber.toString() &&
      req.user.id !== txn.creator.toString()
    ) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    // Use absolute path if necessary
    res.download(path.resolve(txn.receiptUrl));
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
