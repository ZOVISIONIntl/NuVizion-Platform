// server/middleware/tier.js

// Usage: tier('nuvizion') or tier('covenant')
module.exports = (requiredTier) => (req, res, next) => {
  const userTier = req.user?.tier;
  if (!userTier) return res.status(401).json({ msg: 'User not found.' });

  // Define tier hierarchy
  const levels = ['basic', 'nuvizion', 'covenant'];

  // Only allow if user's tier is >= required tier
  if (levels.indexOf(userTier) < levels.indexOf(requiredTier)) {
    return res.status(403).json({ msg: 'Insufficient tier for this action.' });
  }
  next();
};
