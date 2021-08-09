const pageController = require('../controllers/pageController');
const express = require('express');
const router = express.Router();

router.get('/home/:page' ,pageController.getPage);
router.post('/home/:page' ,pageController.postPage);

module.exports = router;