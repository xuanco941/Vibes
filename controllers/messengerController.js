
const authSchema = require('../model/Schema/authSchema') ;

class messengerController{
    getMessenger(req , res) {
        authSchema.findById(req.cookies.userCookie)
        .then(data => {
            res.render('messenger' , {username : data.username})
        }
    )
    }
}

module.exports = new messengerController;