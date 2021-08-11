const messengerController = require('../controllers/messengerController');
const express = require('express');
const router = express.Router();

router.get('/messenger' , messengerController.getMessenger);
router.get('/messenger/:room' , messengerController.getSlugMessenger);

module.exports = router;