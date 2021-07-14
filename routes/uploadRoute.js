const uploadController = require('../controllers/uploadController');

const express = require('express');
const router = express.Router();

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });





router.get('/upload', uploadController.getUpload);
router.post('/upload', upload.single('file'),
uploadController.postUpload);

module.exports = router;