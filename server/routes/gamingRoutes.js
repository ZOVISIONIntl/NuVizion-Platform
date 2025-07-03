const express = require('express');
const router = express.Router();
const { testGamingRoute } = require('../controllers/gamingController');

router.get('/test', testGamingRoute);

module.exports = router;
 