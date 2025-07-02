 // server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const payoutRoutes = require('./routes/payoutRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const gamingRoutes = require('./routes/gamingRoutes');
const squareRoutes = require('./routes/squareRoutes');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/legal/receipts', express.static(__dirname + '/../legal/receipts'));


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
app.use('/api/receipts', receiptRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/settings', settingsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/gaming', gamingRoutes);
app.use('/api/square', squareRoutes);

// Add more routes as you build them

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NuVizion server running on port ${PORT}`);
});
