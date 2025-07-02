const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile, addItem, removeItem } = require('../controllers/gamingController');

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.post('/add-item', auth, addItem);
router.post('/remove-item', auth, removeItem);

module.exports = router;
