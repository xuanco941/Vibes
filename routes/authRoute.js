const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authMidleware = require('../middlewares/authMiddleware');

//authentication
router.get('/' , authController.getsignin );
router.get('/signup' , authController.getsignup );
router.post('/' , authController.postsignin)
router.post('/signup' , authController.postsignup)


module.exports = router;
