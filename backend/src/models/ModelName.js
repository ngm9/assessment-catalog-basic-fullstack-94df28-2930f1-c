const mongoose = require('mongoose');

// Assessment schema for Utkrusht Assessment Catalog
// Represents a single skill assessment in the marketplace.
const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  durationMinutes: {
    type: Number,
    required: true,
    min: 5
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Single-field index on title (common query/sort field)
assessmentSchema.index({ title: 1 });

// Use explicit collection name 'assessments'
module.exports = mongoose.model('Assessment', assessmentSchema, 'assessments');
