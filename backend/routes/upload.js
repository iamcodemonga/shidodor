const express = require('express');
const router = express.Router();
const addController = require('../controllers/upload');

// const router = express.Router();

router.post('/album', addController.album);

router.post('/song', addController.song);

router.post('/video', addController.video);

router.post('/test', addController.test);

module.exports = router;