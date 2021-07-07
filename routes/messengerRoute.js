const messengerController = require('../controllers/messengerController');
const express = require('express');
const router = express.Router();

router.get('/messenger' , messengerController.getMessenger);

module.exports = router;