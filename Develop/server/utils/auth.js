const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    // Look for the token in the Authorization header
    const token = req.headers.authorization || '';

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Extract user data from the token
      const { data } = jwt.verify(token, secret);
      req.user = data;
      next();
    } catch (error) {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
