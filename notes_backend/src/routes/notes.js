'use strict';

const express = require('express');
const { validateCreateNote, validateUpdateNote, validateIdParam } = require('../middleware/validateNote');
const store = require('../store/memoryStore');

const router = express.Router();

/**
 * GET /notes
 * Returns all notes
 */
// PUBLIC_INTERFACE
router.get('/', (req, res) => {
  /** Get list of notes */
  const notes = store.getAll();
  return res.status(200).json(notes);
});

/**
 * GET /notes/:id
 * Returns a single note by ID
 */
// PUBLIC_INTERFACE
router.get('/:id', validateIdParam, (req, res) => {
  const note = store.getById(req.params.id);
  if (!note) {
    return res.status(404).json({ status: 'error', message: 'Note not found' });
  }
  return res.status(200).json(note);
});

/**
 * POST /notes
 * Creates a new note
 */
// PUBLIC_INTERFACE
router.post('/', validateCreateNote, (req, res) => {
  const { title, content } = req.body;
  const created = store.create({ title, content });
  return res.status(201).json(created);
});

/**
 * PUT /notes/:id
 * Updates an existing note
 */
// PUBLIC_INTERFACE
router.put('/:id', validateIdParam, validateUpdateNote, (req, res) => {
  const { title, content } = req.body;
  const updated = store.update(req.params.id, { title, content });
  if (!updated) {
    return res.status(404).json({ status: 'error', message: 'Note not found' });
  }
  return res.status(200).json(updated);
});

/**
 * DELETE /notes/:id
 * Deletes a note by ID
 */
// PUBLIC_INTERFACE
router.delete('/:id', validateIdParam, (req, res) => {
  const success = store.remove(req.params.id);
  if (!success) {
    return res.status(404).json({ status: 'error', message: 'Note not found' });
  }
  return res.status(204).send();
});

module.exports = router;
