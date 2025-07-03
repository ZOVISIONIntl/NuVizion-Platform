// server/utils/squareClient.js
const { Client, Environment } = require('square');

// Replace with your real credentials from Square Developer Dashboard
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || 'YOUR_SANDBOX_ACCESS_TOKEN';

const squareClient = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // Change to Environment.Production when live
});

module.exports = squareClient;
