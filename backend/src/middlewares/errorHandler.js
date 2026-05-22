function errorHandler(err, req, res, next) {
  console.error('🔥 Error Handler caught error:', err.stack || err.message);
  res.status(500).json({ error: 'Internal server error.' });
}

module.exports = errorHandler;
