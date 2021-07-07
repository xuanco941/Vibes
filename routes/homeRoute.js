const homeController = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

router.get('/home' ,homeController.getHome);

module.exports = router;