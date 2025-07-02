const Subscription = require('../models/subscription');
const User = require('../models/user');

// Subscribe to a creator
exports.subscribe = async (req, res) => {
  const { creatorId, tier } = req.body;
  if (req.user.id === creatorId) return res.status(400).json({ msg: "Can't subscribe to yourself!" });
  const sub = new Subscription({ subscriber: req.user.id, creator: creatorId, tier });
  await sub.save();
  res.json({ msg: 'Subscribed!', sub });
};

// View my subscriptions
exports.mySubscriptions = async (req, res) => {
  const subs = await Subscription.find({ subscriber: req.user.id }).populate('creator', 'name email tier');
  res.json(subs);
};

// View subscribers (for creators)
exports.mySubscribers = async (req, res) => {
  const subs = await Subscription.find({ creator: req.user.id }).populate('subscriber', 'name email');
  res.json(subs);
};

// Cancel subscription
exports.cancel = async (req, res) => {
  await Subscription.findByIdAndUpdate(req.params.id, { active: false });
  res.json({ msg: 'Subscription cancelled.' });
};
