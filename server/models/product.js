 const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  digital: { type: Boolean, default: false },
  fileUrl: String, // URL to download after purchase (if digital)
  imageUrl: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError on server reloads
module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
