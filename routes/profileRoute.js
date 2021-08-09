const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:username' , profileController.getProfile );
router.post('/:username' , profileController.postProfile);
router.get('/update/avatar' , profileController.getAvatar);
router.post('/update/avatar' , profileController.upload ,profileController.postAvatar);
router.get('/:username/posts' , profileController.getPosts);

module.exports = router;

