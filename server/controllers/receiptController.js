const User = require('../models/User');
const Transaction = require('../models/Transaction');
const generateReceipt = require('../utils/receipt');
const path = require('path');

exports.createDonationReceipt = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { amount, type, txnId } = req.body;
    const date = new Date().toLocaleDateString();

    const pdfPath = await generateReceipt({
      name: user.username,
      email: user.email,
      amount,
      type,
      date,
      tier: user.tier,
      txnId
    });

    // Optionally, save the receipt location to the transaction or user
    res.download(pdfPath, (err) => {
      if (err) {
        res.status(500).json({ msg: 'Could not download receipt' });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createDonationReceipt = async (req, res) => {
  try {
    // ...existing code...
    const { amount, txnId } = req.body;
    const txn = await Transaction.findById(txnId).populate('creator').populate('subscriber');
    if (!txn) return res.status(404).json({ msg: 'Transaction not found' });

    // Only allow for creators (self) or for subscribers IF creator was Tier 3
    if (
      (req.user.id === txn.creator._id.toString()) || 
      (req.user.id === txn.subscriber._id.toString() && txn.creatorTier === 'covenant')
    ) {
      // Generate and send receipt
      // ...existing PDF logic...
    } else {
      return res.status(403).json({ msg: 'You are not eligible for a donation receipt on this transaction.' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
