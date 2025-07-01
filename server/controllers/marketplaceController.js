const Product = require('../models/Product');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const generateReceipt = require('../utils/receipt');

exports.addProduct = async (req, res) => {
  // Only allow creators to add
  const user = await User.findById(req.user.id);
  if (user.role !== 'creator') {
    return res.status(403).json({ msg: 'Only creators can add products.' });
  }
  const { title, description, price, type, imageUrl } = req.body;
  const product = new Product({ creator: user._id, title, description, price, type, imageUrl });
  await product.save();
  res.json(product);
};

exports.listProducts = async (req, res) => {
  const products = await Product.find().populate('creator', 'username tier');
  res.json(products);
};

exports.purchaseProduct = async (req, res) => {
  // Only allow subscribers to purchase
  const user = await User.findById(req.user.id);
  if (user.role !== 'subscriber') {
    return res.status(403).json({ msg: 'Only subscribers can purchase products.' });
  }

  const { productId } = req.body;
  const product = await Product.findById(productId).populate('creator');
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  // Payment logic (Stripe/crypto/etc.) would go here...

  // Save transaction and determine if receipt is needed
  const txn = new Transaction({
    subscriber: user._id,
    creator: product.creator._id,
    amount: product.price,
    type: 'marketplace',
    creatorTier: product.creator.tier,
    status: 'completed'
  });
  await txn.save();

  // Only provide receipt if creator is Covenant (Tier 3)
  let receiptUrl = null;
  if (product.creator.tier === 'covenant') {
    // Generate receipt for subscriber
    receiptUrl = await generateReceipt({
      name: user.username,
      email: user.email,
      amount: product.price,
      type: 'Product Purchase (Covenant Creator)',
      date: new Date().toLocaleDateString(),
      tier: product.creator.tier,
      txnId: txn._id
    });
  }

  res.json({
    msg: 'Purchase complete.',
    product: product.title,
    creator: product.creator.username,
    tier: product.creator.tier,
    receipt: receiptUrl
  });
};

const Transaction = require('../models/Transaction');

exports.purchaseProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyer = req.user; // authenticated user (subscriber)
    const product = await Product.findById(productId).populate('creator');

    if (!product || !product.active) return res.status(404).json({ msg: 'Product not found.' });
    if (product.creator._id.toString() === buyer.id) return res.status(403).json({ msg: 'Creators cannot buy their own products.' });

    // Create a new transaction (logs who bought, who sold, price, creator tier)
    const txn = new Transaction({
      subscriber: buyer.id,
      creator: product.creator._id,
      amount: product.price,
      type: 'marketplace',
      creatorTier: product.creator.tier,
      status: 'completed'
    });
    await txn.save();

    // (Here you’d handle actual payment processing with Stripe/crypto/etc.)

    // Digital? Send file; Physical? Notify creator
    let downloadLink = null;
    if (product.digital && product.fileUrl) {
      downloadLink = product.fileUrl;
    }

    // If the creator is Covenant, let the buyer know they’re eligible for a receipt
    const receiptEligible = product.creator.tier === 'covenant';

    res.json({
      msg: `Purchase successful. ${receiptEligible ? "You are eligible for a donation receipt." : "This purchase is not tax deductible."}`,
      product: {
        title: product.title,
        price: product.price,
        creator: product.creator.username,
        digital: product.digital,
        downloadLink
      },
      receiptEligible,
      txnId: txn._id
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
