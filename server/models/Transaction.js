const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creator:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount:     { type: Number, required: true },
  type:       { type: String, enum: ['payout', 'donation', 'subscription', 'marketplace'], default: 'marketplace' },
  creatorTier:{ type: String, enum: ['basic', 'nuvizion', 'covenant'], default: 'basic' },
  method:     { type: String, enum: ['direct', 'nuvizion', 'covenant', 'external'], default: 'direct' },
  status:     { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  receiptUrl: String,
  createdAt:  { type: Date, default: Date.now }
});

// THIS FIXES THE ERROR:
module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
