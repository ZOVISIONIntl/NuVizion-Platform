const User = require('../models/User');
const Transaction = require('../models/Transaction');
const generateReceipt = require('../utils/receipt'); // If you want to generate PDF instantly

// POST /api/payments/subscribe
exports.subscribeAndPay = async (req, res) => {
  try {
    const { creatorId, amount } = req.body;
    const subscriberId = req.user.id;

    // Find the creator
    const creator = await User.findById(creatorId);
    if (!creator || creator.role !== 'creator') {
      return res.status(400).json({ msg: 'Invalid creator ID.' });
    }

    // Subscribers can’t subscribe to themselves or other subscribers
    if (creatorId === subscriberId) {
      return res.status(400).json({ msg: 'You cannot subscribe to yourself.' });
    }

    // Get creator’s tier at time of transaction
    const creatorTier = creator.tier;

    // TODO: Add your real payment gateway logic here (Stripe, crypto, etc.)
    // For now, just pretend payment succeeded.

    // Record transaction
    const txn = new Transaction({
      subscriber: subscriberId,
      creator: creatorId,
      amount,
      type: 'subscription',
      creatorTier,
      status: 'completed',
      method: creatorTier === 'basic' ? 'direct' : (creatorTier === 'nuvizion' ? 'nuvizion' : 'covenant')
    });
    await txn.save();

    // If the creator is "covenant", offer a receipt
    let receiptUrl = null;
    if (creatorTier === 'covenant') {
      // Generate a donation receipt for the subscriber (optional, comment if you want manual download later)
      receiptUrl = await generateReceipt({
        name: req.user.username,
        email: req.user.email,
        amount,
        type: 'Subscription (Covenant Creator)',
        date: new Date().toLocaleDateString(),
        tier: creatorTier,
        txnId: txn._id.toString()
      });
    }

    res.json({
      msg: `Subscription/payment processed. ${creatorTier === 'covenant' ? 'You are eligible for a tax receipt.' : 'This payment is NOT tax deductible.'}`,
      txn,
      receiptUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
