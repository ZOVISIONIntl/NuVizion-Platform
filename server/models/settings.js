const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  emailNotifications: { type: Boolean, default: true },
  platformAnnouncements: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false }
});

module.exports = mongoose.model('Settings', settingsSchema);
