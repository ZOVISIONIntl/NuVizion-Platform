const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Notification', notificationSchema);
