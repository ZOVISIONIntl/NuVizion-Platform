const mongoose = require('mongoose');

const gamingProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  nuverseHandle: { type: String, unique: true, required: true },
  avatarUrl: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  inventory: [{ type: String }], // List of NFT/item IDs or names
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('GamingProfile', gamingProfileSchema);
