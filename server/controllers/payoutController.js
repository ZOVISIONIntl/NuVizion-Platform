const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Payout endpoint (route will be created in next step)
exports.payout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { amount } = req.body;

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Tier logic for payouts:
    let payoutType = user.tier;
    let payoutMethod = 'direct';
    if (user.tier === 'nuvizion') payoutMethod = 'nuvizion';
    if (user.tier === 'covenant') payoutMethod = 'covenant';

    // (Integrate payment API/logic here: Stripe, crypto, etc.)

    const txn = new Transaction({
      user: user._id,
      amount,
      type: 'payout',
      tier: user.tier,
      method: payoutMethod,
      status: 'completed' // Placeholder for actual payout logic
    });
    await txn.save();

    res.json({ msg: `Payout processed (${user.tier})`, txn });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
