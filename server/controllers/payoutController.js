const Payout = require('../models/payout');

// Request payout (user)
exports.requestPayout = async (req, res) => {
  try {
    const payout = new Payout({ user: req.user.id, amount: req.body.amount });
    await payout.save();
    res.json({ msg: 'Payout request submitted', payout });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// View user payouts
exports.getUserPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find({ user: req.user.id });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// View all payouts (admin only)
exports.getAllPayouts = async (req, res) => {
  // You can later add admin auth here
  try {
    const payouts = await Payout.find().populate('user', 'name email');
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Approve/decline payout (admin)
exports.updatePayoutStatus = async (req, res) => {
  try {
    const payout = await Payout.findById(req.params.id);
    if (!payout) return res.status(404).json({ msg: 'Payout not found' });

    payout.status = req.body.status; // 'approved' or 'declined'
    payout.processedAt = new Date();
    await payout.save();
    res.json(payout);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
