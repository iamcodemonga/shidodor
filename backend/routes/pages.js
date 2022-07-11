const express = require('express');
const pageController = require('../controllers/pages');

const router = express.Router();

router.get('/auth', pageController.auth);

router.get('/uploads', pageController.uploads);

module.exports = router;