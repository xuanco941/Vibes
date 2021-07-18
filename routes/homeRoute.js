const homeController = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

router.get('/home' ,homeController.getHome);
router.post('/home', homeController.postHome);

module.exports = router;