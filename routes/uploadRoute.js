const uploadController = require('../controllers/uploadController');

const express = require('express');
const router = express.Router();


router.get('/upload', uploadController.getUpload);
router.post('/upload', uploadController.upload,
uploadController.postUpload);

module.exports = router;