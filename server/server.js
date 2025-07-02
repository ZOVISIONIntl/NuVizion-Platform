 // server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const payoutRoutes = require('./routes/payoutRoutes');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('NuVizion Backend API is up!');
});

// === Connect to MongoDB ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// === ROUTES ===
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payouts', require('./routes/payoutRoutes'));
app.use('/api/receipts', require('./routes/receiptRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/marketplace', require('./routes/marketplaceRoutes'));
// Add more routes as you build them

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NuVizion server running on port ${PORT}`);
});
