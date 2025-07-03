const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tier:     { type: String, enum: ['basic', 'nuvizion', 'covenant'], default: 'basic' },
  role:     { type: String, enum: ['subscriber', 'creator', 'admin'], default: 'subscriber' },
  createdAt: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError on server reloads
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
 