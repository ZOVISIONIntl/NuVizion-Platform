 const User = require('../models/User');
const Transaction = require('../models/Transaction');
const generateReceipt = require('../utils/receipt');
const { addProfit } = require('../utils/nucoin');

// POST /api/payments/subscribe
exports.subscribeAndPay = async (req, res) => {
  try {
    const { creatorId, amount } = req.body;
    const subscriberId = req.user.id;

    // Validate creator
    const creator = await User.findById(creatorId);
    if (!creator || creator.role !== 'creator') {
      return res.status(400).json({ msg: 'Invalid creator ID.' });
    }

    // Prevent self-subscription
    if (creatorId === subscriberId) {
      return res.status(400).json({ msg: 'You cannot subscribe to yourself.' });
    }

    // Get creator’s tier at time of transaction
    const creatorTier = creator.tier || 'basic';

    // --------- PAYMENT GATEWAY INTEGRATION HERE ---------
    // TODO: Connect real payment logic (Stripe, PayPal, etc.)
    // For now, we'll assume payment succeeded.

    // Calculate platform fee (e.g., 10%)
    const platformFeeAmount = Math.floor(amount * 0.10); // You can change %

    // Credit NuCoin profit ledger (internal treasury)
    await addProfit({
      ownerId: process.env.ADMIN_USER_ID, // Set this env var to your admin user ID
      amount: platformFeeAmount,
      note: `Platform fee from subscription payment: subscriber ${subscriberId} → creator ${creatorId}`
    });

    // Record full transaction (subscriber, creator, full amount, etc.)
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

    // Optionally: Generate a tax-deductible receipt if creator is "covenant"
    let receiptUrl = null;
    if (creatorTier === 'covenant') {
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

    // Respond to frontend
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
