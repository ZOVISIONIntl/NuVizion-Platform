module.exports = (requiredTier) => (req, res, next) => {
  const userTier = req.user?.tier;
  if (!userTier) return res.status(401).json({ msg: 'User not found.' });

  // Tier order: basic < nuvizion < covenant
  const levels = ['basic', 'nuvizion', 'covenant'];
  if (levels.indexOf(userTier) < levels.indexOf(requiredTier)) {
    return res.status(403).json({ msg: 'Insufficient tier for this action.' });
  }
  next();
};
