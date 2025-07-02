const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllPayouts,
  updatePayoutStatus,
  deleteProduct
} = require('../controllers/adminController');

// User management
router.get('/users', auth, admin, getAllUsers);
router.put('/users/:id', auth, admin, updateUser);
router.delete('/users/:id', auth, admin, deleteUser);

// Payout management
router.get('/payouts', auth, admin, getAllPayouts);
router.put('/payouts/:id', auth, admin, updatePayoutStatus);

// Product management
router.delete('/products/:id', auth, admin, deleteProduct);

module.exports = router;
