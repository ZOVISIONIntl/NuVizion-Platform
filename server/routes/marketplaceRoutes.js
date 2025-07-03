const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const tier = require('../middleware/tier');
const { addProduct, listProducts, purchaseProduct } = require('../controllers/marketplaceController');

// Only creators can add products
router.post('/products', auth, tier('basic'), addProduct);

// Anyone (including subscribers) can list/browse products
router.get('/products', listProducts);

// Only subscribers can purchase products
router.post('/checkout', auth, purchaseProduct);

module.exports = router;
