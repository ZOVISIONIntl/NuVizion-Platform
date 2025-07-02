const User = require('../models/user');
const Payout = require('../models/payout');
const Product = require('../models/product');

// View all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Update user role/tier
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
};

// Delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'User deleted' });
};

// View all payout requests
exports.getAllPayouts = async (req, res) => {
  const payouts = await Payout.find().populate('user', 'name email');
  res.json(payouts);
};

// Approve/decline payout
exports.updatePayoutStatus = async (req, res) => {
  const payout = await Payout.findById(req.params.id);
  if (!payout) return res.status(404).json({ msg: 'Payout not found' });
  payout.status = req.body.status;
  payout.processedAt = new Date();
  await payout.save();
  res.json(payout);
};

// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Product deleted' });
};
