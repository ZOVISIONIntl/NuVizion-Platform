const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who paid
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },    // Who they paid
  amount: Number,
  type: { type: String, enum: ['payout', 'donation', 'subscription', 'marketplace'] },
  creatorTier: { type: String, enum: ['basic', 'nuvizion', 'covenant'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  method: { type: String, enum: ['direct', 'nuvizion', 'covenant'] },
  createdAt: { type: Date, default: Date.now },
  receiptUrl: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
