const authSchema = require('../model/Schema/authSchema');
const newsSchema = require('../model/Schema/newsSchema');
class homeController {
    getHome(req, res , next) {
        authSchema.findById(req.cookies.userCookie)
            .then(usermain => {
                newsSchema.find({}).then((news) => {
                    news = news.map(data => data.toObject());
                    res.render('home', { news, usermain: usermain.username })
                })
            }
            ).catch(next);

    }
}

module.exports = new homeController;