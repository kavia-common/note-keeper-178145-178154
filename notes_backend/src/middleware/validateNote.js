'use strict';

const { validate: validateUuid } = require('uuid');

/**
 * Validate ID param middleware.
 */
// PUBLIC_INTERFACE
function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!id || !validateUuid(id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid note id' });
  }
  return next();
}

/**
 * Validate create note payload middleware.
 * Requires title and content as non-empty strings.
 */
// PUBLIC_INTERFACE
function validateCreateNote(req, res, next) {
  const { title, content } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ status: 'error', message: 'title is required and must be a non-empty string' });
  }
  if (typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ status: 'error', message: 'content is required and must be a non-empty string' });
  }
  return next();
}

/**
 * Validate update note payload middleware.
 * Allows partial updates but any provided field must be a non-empty string.
 */
// PUBLIC_INTERFACE
function validateUpdateNote(req, res, next) {
  const { title, content } = req.body || {};

  if (title === undefined && content === undefined) {
    return res.status(400).json({ status: 'error', message: 'At least one of title or content must be provided' });
  }

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ status: 'error', message: 'title, if provided, must be a non-empty string' });
  }

  if (content !== undefined && (typeof content !== 'string' || !content.trim())) {
    return res.status(400).json({ status: 'error', message: 'content, if provided, must be a non-empty string' });
  }

  return next();
}

module.exports = {
  validateIdParam,
  validateCreateNote,
  validateUpdateNote,
};
