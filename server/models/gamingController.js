const GamingProfile = require('../models/gamingProfile');

// Get current user's gaming profile (create if missing)
exports.getProfile = async (req, res) => {
  let gp = await GamingProfile.findOne({ user: req.user.id });
  if (!gp) {
    gp = await GamingProfile.create({ user: req.user.id, nuverseHandle: 'nu-' + req.user.id.slice(-6) });
  }
  res.json(gp);
};

// Update avatar or handle
exports.updateProfile = async (req, res) => {
  const updates = {};
  if (req.body.avatarUrl) updates.avatarUrl = req.body.avatarUrl;
  if (req.body.nuverseHandle) updates.nuverseHandle = req.body.nuverseHandle;
  const gp = await GamingProfile.findOneAndUpdate({ user: req.user.id }, updates, { new: true });
  res.json(gp);
};

// Add/remove inventory item (stub for demo)
exports.addItem = async (req, res) => {
  const gp = await GamingProfile.findOne({ user: req.user.id });
  gp.inventory.push(req.body.item);
  await gp.save();
  res.json(gp);
};

exports.removeItem = async (req, res) => {
  const gp = await GamingProfile.findOne({ user: req.user.id });
  gp.inventory = gp.inventory.filter(i => i !== req.body.item);
  await gp.save();
  res.json(gp);
};
