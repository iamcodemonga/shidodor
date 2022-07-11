const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// const router = express.Router();

router.post('/login', authController.login);

router.put('/ep/:id', authController.editProfile);

router.put('/password/:id', authController.password);

router.delete('/logout', authController.logout);

module.exports = router;