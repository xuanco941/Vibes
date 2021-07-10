const uploadImgController = require('../controllers/uploadImgController');

const express = require('express');
const router = express.Router();

router.get('/upload' , uploadImgController.getUpload )

module.exports = router;