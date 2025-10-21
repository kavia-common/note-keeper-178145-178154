'use strict';

const { v4: uuidv4 } = require('uuid');

// Simple in-memory store for notes.
// Note: This is not persistent and will reset on server restart.
const notes = [];

/**
 * Create a note and return it.
 */
// PUBLIC_INTERFACE
function create({ title, content }) {
  const now = new Date().toISOString();
  const note = {
    id: uuidv4(),
    title: title.trim(),
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
  };
  notes.push(note);
  return note;
}

/**
 * Get all notes.
 */
// PUBLIC_INTERFACE
function getAll() {
  // Return a shallow copy to avoid external mutation
  return notes.map(n => ({ ...n }));
}

/**
 * Get note by id.
 */
// PUBLIC_INTERFACE
function getById(id) {
  return notes.find(n => n.id === id) || null;
}

/**
 * Update note by id. Returns updated note or null if not found.
 */
// PUBLIC_INTERFACE
function update(id, { title, content }) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return null;

  const current = notes[idx];
  const updated = {
    ...current,
    title: title !== undefined ? title.trim() : current.title,
    content: content !== undefined ? content.trim() : current.content,
    updatedAt: new Date().toISOString(),
  };
  notes[idx] = updated;
  return updated;
}

/**
 * Remove note by id. Returns true if removed, false if not found.
 */
// PUBLIC_INTERFACE
function remove(id) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return false;
  notes.splice(idx, 1);
  return true;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
