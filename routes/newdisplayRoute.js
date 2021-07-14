const express = require('express');
const router = express.Router();

router.get('/newdisplay' , (req , res , next)=>{
    res.render('newdisplay' , {layout : false});
});

module.exports = router;