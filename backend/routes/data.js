const express = require('express');
const dataController = require('../controllers/data');

const router = express.Router();


//Get request starts here
router.get('/albums', dataController.albums);

router.get('/songs', dataController.songs);

router.get('/videos', dataController.videos);

router.get('/donations', dataController.donations);

router.get('/analytics', dataController.analytics);
// Get request Ends here


// Post Request starts here
router.post('/paid', dataController.addPayment);
// Post request ends here


// Put request starts here
router.put('/album/:id', dataController.editalbum);

router.put('/song/:id', dataController.editsong);

router.put('/video/:id', dataController.editvideo);
// Put request ends here


// Delete request starts here
router.delete('/album/:id', dataController.removealbum);

router.delete('/song/:id', dataController.removesong);

router.delete('/video/:id', dataController.removevideo);
// Delete request ends here


module.exports = router;