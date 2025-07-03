const Transaction = require('../models/transaction');
const generateReceipt = require('../utils/receipt');
const path = require('path');

exports.createReceipt = async (req, res) => {
  try {
    const { txnId } = req.body;
    const txn = await Transaction.findById(txnId).populate('subscriber creator');
    if (!txn) return res.status(404).json({ msg: 'Transaction not found.' });

    // Generate PDF receipt
    const pdfPath = await generateReceipt({
      name: txn.subscriber.name,
      email: txn.subscriber.email,
      amount: txn.amount,
      txnId: txn._id
    });
    txn.receiptUrl = `/legal/receipts/${path.basename(pdfPath)}`;
    await txn.save();

    res.status(201).json({ msg: 'Receipt generated', receiptUrl: txn.receiptUrl });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.downloadReceipt = async (req, res) => {
  try {
    const txn = await Transaction.findById(req.params.txnId);
    if (!txn || !txn.receiptUrl) return res.status(404).json({ msg: 'Receipt not found.' });
    res.download(path.resolve(`.${txn.receiptUrl}`));
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
 