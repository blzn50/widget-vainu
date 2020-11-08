const { database } = require('../database');

const authenticationMiddleware = (req, res, next) => {
  const origin = req.get('origin');
  const originRes = database.filter((each) => each.origin === origin);
  if (originRes && originRes.length === 1) {
    const { apiKey } = originRes[0];
    if (apiKey) {
      res.locals.VAINU_KEY = apiKey;
      next();
      return;
    }
  }
  res.status(403).json({
    error: 'API key not found! Please contact support',
  });
  return;
};

module.exports = { authenticationMiddleware };
