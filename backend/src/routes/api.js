const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

// GET /api/assessments - list all assessments
router.get('/assessments', controller.getAssessments);

// POST /api/assessments - create a new assessment
router.post('/assessments', controller.createAssessment);

module.exports = router;
