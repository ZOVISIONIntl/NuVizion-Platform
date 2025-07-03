const NuCoinTreasury = require('../models/NuCoinTreasury');

exports.addProfit = async ({ ownerId, amount, note }) => {
  let treasury = await NuCoinTreasury.findOne({ owner: ownerId });
  if (!treasury) {
    treasury = new NuCoinTreasury({ owner: ownerId, balance: 0, history: [] });
  }
  treasury.balance += amount;
  treasury.history.push({
    amount,
    type: 'platform_profit',
    note,
  });
  await treasury.save();
  return treasury.balance;
};

exports.getBalance = async (ownerId) => {
  const treasury = await NuCoinTreasury.findOne({ owner: ownerId });
  return treasury ? treasury.balance : 0;
};

exports.getHistory = async (ownerId) => {
  const treasury = await NuCoinTreasury.findOne({ owner: ownerId });
  return treasury ? treasury.history : [];
};
