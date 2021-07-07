const authSchema = require('../model/Schema/authSchema') ;

function requireAuth (req , res , next) {

    if (!req.cookies.userCookie){
        res.redirect('/');
        return;
    }

    authSchema.findById(req.cookies.userCookie)
    .then(data => {
        if(data._id != req.cookies.userCookie){
            res.redirect('/');
            return;
        }
    })

    next();
}

module.exports = requireAuth;