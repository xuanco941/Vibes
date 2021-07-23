const express = require('express');
const router = express.Router();

router.get('/vibes/error' , (req , res )=>{
    res.render('error' , {layout : false});
})

module.exports = router;