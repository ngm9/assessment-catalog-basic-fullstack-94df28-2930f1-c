const Assessment = require('../models/ModelName');

// Controller stubs currently returning mock data.
// Your task will be to replace these with real Mongoose queries
// using the Assessment model.

// Simple in-memory mock used as a placeholder before wiring MongoDB.
const mockAssessments = [
  {
    _id: 'mock1',
    title: 'Mock JavaScript Fundamentals',
    category: 'Web Development',
    difficulty: 'Beginner',
    durationMinutes: 30,
    isActive: true
  },
  {
    _id: 'mock2',
    title: 'Mock React Basics',
    category: 'Frontend',
    difficulty: 'Beginner',
    durationMinutes: 45,
    isActive: true
  }
];

// GET /api/assessments
// Currently returns a hardcoded array of assessments.
// Replace this implementation with a Mongoose find() query.
async function getAssessments(req, res) {
  try {
    // TODO: Replace mockAssessments with real MongoDB data via Mongoose.
    return res.json(mockAssessments);
  } catch (err) {
    console.error('Error in getAssessments controller', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /api/assessments
// Currently echoes back the request body as a fake created item.
// Replace this implementation with creating and saving a Mongoose document.
async function createAssessment(req, res) {
  try {
    const { title, category, difficulty, durationMinutes, isActive } = req.body || {};

    if (!title || !category || !difficulty || !durationMinutes) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Placeholder: simulate a created assessment without touching MongoDB.
    const created = {
      _id: `mock-${Date.now()}`,
      title,
      category,
      difficulty,
      durationMinutes,
      isActive: typeof isActive === 'boolean' ? isActive : true
    };

    // TODO: Replace the above with something like:
    // const created = await Assessment.create({...});

    return res.status(201).json(created);
  } catch (err) {
    console.error('Error in createAssessment controller', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAssessments,
  createAssessment
};
