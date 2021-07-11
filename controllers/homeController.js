const authSchema = require('../model/Schema/authSchema') ;
class homeController{
    getHome(req , res) {
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => {
            res.render('home' , {usermain : usermain.username})
        }
    )
    }
}

module.exports = new homeController;