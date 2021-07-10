const authSchema = require('../model/Schema/authSchema') ;
class homeController{
    getHome(req , res) {
        authSchema.findById(req.cookies.userCookie)
        .then(data => {
            res.render('home' , {username : data.username})
        }
    )
    }
}

module.exports = new homeController;