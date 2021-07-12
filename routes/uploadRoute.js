const uploadController = require('../controllers/uploadController');

const express = require('express');
const router = express.Router();

router.get('/upload' , uploadController.getUpload )

module.exports = router;