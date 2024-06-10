module.exports = (res, err) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.customMessage || 'Server Error';
  return res.status(statusCode).send(message);
};
