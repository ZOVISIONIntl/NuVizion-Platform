const mongoose = require('mongoose');

const TreasurySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  history: [
    {
      amount: Number,
      type: { type: String }, // e.g. 'platform_profit', 'adjustment'
      date: { type: Date, default: Date.now },
      note: String,
    }
  ]
});

module.exports = mongoose.model('NuCoinTreasury', TreasurySchema);
