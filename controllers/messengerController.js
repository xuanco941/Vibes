
const authSchema = require('../model/Schema/authSchema') ;

class messengerController{
    getMessenger(req , res , next) {
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => {
            res.render('messenger' , {usermain : usermain.username})
        }
    )
    .catch(next)
    }

    getSlugMessenger(req , res , next) {
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => {
            res.render('messenger' , {usermain : usermain.username})
        }
    )
    .catch(()=> res.redirect('/vibes/error'));
    }
}

module.exports = new messengerController;