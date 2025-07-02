const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get current profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

// Update profile (name, email)
exports.updateProfile = async (req, res) => {
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.email) updates.email = req.body.email;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
  res.json(user);
};

// Change password
exports.changePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { currentPassword, newPassword } = req.body;
  if (!(await bcrypt.compare(currentPassword, user.password)))
    return res.status(400).json({ msg: 'Current password incorrect.' });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ msg: 'Password updated!' });
};
