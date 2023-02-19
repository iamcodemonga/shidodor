const express = require('express');
const homeController = require('../controllers/home');

const router = express.Router();

router.get('/', homeController.hero);

router.get('/albums', homeController.albums);

router.get('/album/:uid', homeController.album);

router.get('/songs', homeController.songs);

router.get('/song/:uid', homeController.song);

router.get('/videos', homeController.videos);

router.get('/video/:uid', homeController.video);

router.post('/contact', homeController.contact);

router.get('/donate', homeController.donate);

router.get('/verifyPayment', homeController.verifyPayment);

router.get('/download/:filename', homeController.download);

module.exports = router;