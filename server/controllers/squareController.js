const { Client, Environment } = require('square');
require('dotenv').config();

const squareClient = new Client({
  environment: Environment.Sandbox, // Use .Production for live
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});

// Create a payment intent (client-side will get token via Square's Web Payments SDK)
exports.createPayment = async (req, res) => {
  try {
    const { nonce, amount } = req.body; // nonce comes from frontend card form
    const paymentsApi = squareClient.paymentsApi;

    const response = await paymentsApi.createPayment({
      sourceId: nonce,
      idempotencyKey: Date.now().toString(), // Must be unique for each request
      amountMoney: {
        amount: Math.round(amount * 100), // in cents
        currency: 'USD'
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    res.json({ payment: response.result.payment });
  } catch (err) {
    res.status(500).json({ msg: err.message || "Payment failed" });
  }
};
