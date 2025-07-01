const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tier:     { type: String, enum: ['basic', 'nuvizion', 'covenant'], default: 'basic' },
  role:     { type: String, enum: ['creator', 'subscriber', 'admin'], default: 'subscriber' },
  createdAt: { type: Date, default: Date.now },
  // Add more: payouts, compliance docs, AR/VR keys, as you expand
});

module.exports = mongoose.model('User', UserSchema);
