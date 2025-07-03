// server/controllers/marketplaceController.js

const Product = require('../models/Product');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const generateReceipt = require('../utils/receipt');

// Creator adds product
exports.addProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'creator') {
      return res.status(403).json({ msg: 'Only creators can add products.' });
    }
    const { title, description, price, type, imageUrl, digital, fileUrl } = req.body;
    const product = new Product({
      creator: user._id,
      title,
      description,
      price,
      type,
      imageUrl,
      digital,
      fileUrl,
      active: true
    });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// List products (anyone)
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: true }).populate('creator', 'username tier');
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Subscriber purchases a product
exports.purchaseProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyer = await User.findById(req.user.id);
    if (buyer.role !== 'subscriber') {
      return res.status(403).json({ msg: 'Only subscribers can purchase products.' });
    }

    const product = await Product.findById(productId).populate('creator');
    if (!product || !product.active)
      return res.status(404).json({ msg: 'Product not found.' });

    if (product.creator._id.toString() === buyer.id)
      return res.status(403).json({ msg: 'Creators cannot buy their own products.' });

    // Create a transaction
    const txn = new Transaction({
      subscriber: buyer.id,
      creator: product.creator._id,
      amount: product.price,
      type: 'marketplace',
      creatorTier: product.creator.tier,
      status: 'completed'
    });
    await txn.save();

    // Download link for digital products
    let downloadLink = null;
    if (product.digital && product.fileUrl) {
      downloadLink = product.fileUrl;
    }

    // Generate a receipt for 'covenant' tier creators
    let receiptUrl = null;
    if (product.creator.tier === 'covenant') {
      receiptUrl = await generateReceipt({
        name: buyer.username,
        email: buyer.email,
        amount: product.price,
        type: 'Product Purchase (Covenant Creator)',
        date: new Date().toLocaleDateString(),
        tier: product.creator.tier,
        txnId: txn._id
      });
    }

    res.json({
      msg: `Purchase successful. ${receiptUrl ? "You are eligible for a donation receipt." : "This purchase is not tax deductible."}`,
      product: {
        title: product.title,
        price: product.price,
        creator: product.creator.username,
        digital: product.digital,
        downloadLink
      },
      receiptUrl,
      txnId: txn._id
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
 