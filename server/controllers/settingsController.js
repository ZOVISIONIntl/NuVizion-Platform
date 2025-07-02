const Settings = require('../models/settings');

// Get settings for current user
exports.getSettings = async (req, res) => {
  let settings = await Settings.findOne({ user: req.user.id });
  if (!settings) {
    settings = await Settings.create({ user: req.user.id });
  }
  res.json(settings);
};

// Update settings for current user
exports.updateSettings = async (req, res) => {
  const updates = req.body;
  let settings = await Settings.findOneAndUpdate(
    { user: req.user.id },
    updates,
    { new: true, upsert: true }
  );
  res.json(settings);
};
