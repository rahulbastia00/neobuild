const express = require('express');
const { enrichResume } = require('../controllers/resumeController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/enrich', authMiddleware, enrichResume);

module.exports = router;