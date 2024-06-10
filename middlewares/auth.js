const RestError = require('../utils/restError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new RestError('Token non fornito', 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      throw new RestError('Token non valido', 403);
    }
    req.user = data;
    next();
  });
};
