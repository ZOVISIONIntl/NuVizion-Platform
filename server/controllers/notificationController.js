const Notification = require('../models/notification');

exports.getAll = async (req, res) => {
  const notifications = await Notification.find().sort('-createdAt').limit(20);
  res.json(notifications);
};
