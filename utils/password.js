const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password + process.env.PEPPER_KEY, 10);
  return hashPassword;
};

const comparePassword = async (password, hashPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashPassword);
  return isPasswordValid;
};

module.exports = {
  hashPassword,
  comparePassword,
};
