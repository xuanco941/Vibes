
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
}

module.exports = new messengerController;