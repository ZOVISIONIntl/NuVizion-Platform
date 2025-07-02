const User = require('../models/user');

module.exports = async function(req, res, next) {
  const user = await User.findById(req.user.id);
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Admin only.' });
  }
};
