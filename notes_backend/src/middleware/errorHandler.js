'use strict';

/**
 * Centralized error handler for the API.
 * Converts thrown errors or passed errors into consistent JSON responses.
 */
// PUBLIC_INTERFACE
function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const payload = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  return res.status(status).json(payload);
}

module.exports = errorHandler;
