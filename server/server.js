require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const payoutRoutes = require('./routes/payoutRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  // <-- add when you create payment logic
const marketplaceRoutes = require('./routes/marketplaceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
require('./db');

// Basic health check
app.get('/', (req, res) => res.send('NuVizion Backend API Running'));

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/payments', paymentRoutes); // <-- enable this as soon as paymentRoutes.js exists
app.use('/api/marketplace', marketplaceRoutes);
app.use('/legal/receipts', express.static(__dirname + '/../legal/receipts'));


app.listen(PORT, () => {
  console.log(`NuVizion server running on port ${PORT}`);
});
