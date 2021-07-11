
const authSchema = require('../model/Schema/authSchema') ;

class messengerController{
    getMessenger(req , res) {
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => {
            res.render('messenger' , {usermain : usermain.username})
        }
    )
    }
}

module.exports = new messengerController;