const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:username' , profileController.getProfile );
router.post('/:username' , profileController.postProfile);

module.exports = router;

