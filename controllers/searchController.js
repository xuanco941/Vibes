const authSchema = require('../model/Schema/authSchema') ;

class searchController {
    getSearch(req , res , next) {
        authSchema.findById(req.cookies.userCookie)
        .then(usermain => {
            res.render('search' , {usermain : usermain.username})
        })
    }
}
module.exports = new searchController ;