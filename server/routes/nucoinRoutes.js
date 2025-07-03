const express = require('express');
const router = express.Router();
const { getNuCoinBalance, getNuCoinHistory } = require('../controllers/nucoinController');
// You can add auth middleware if you want to restrict access

router.get('/balance', getNuCoinBalance);
router.get('/history', getNuCoinHistory);

module.exports = router;
