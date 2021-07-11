const authSchema = require('../model/Schema/authSchema') ;

function requireAuth (req , res , next) {
    var idUserCookie = req.cookies.userCookie;

    if (!idUserCookie){
        res.redirect('/');
        return;
    }

    authSchema.findById(idUserCookie)
    .then(data => {
        if(data._id != idUserCookie){
            res.redirect('/');
            return;
        }
    })

    next();
}

module.exports = requireAuth;