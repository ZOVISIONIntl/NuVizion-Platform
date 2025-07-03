const { getBalance, getHistory } = require('../utils/nucoin');

exports.getNuCoinBalance = async (req, res) => {
  const ownerId = process.env.ADMIN_USER_ID;
  const balance = await getBalance(ownerId);
  res.json({ balance });
};

exports.getNuCoinHistory = async (req, res) => {
  const ownerId = process.env.ADMIN_USER_ID;
  const history = await getHistory(ownerId);
  res.json({ history });
};
