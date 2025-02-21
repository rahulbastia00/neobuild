const express = require('express');
const { searchResumes } = require('../controllers/searchController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/name', authMiddleware, searchResumes);

module.exports = router;