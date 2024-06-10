module.exports = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.customMessage || 'Server Error';
  res.status(statusCode).send(message);
};
