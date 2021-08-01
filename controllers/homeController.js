const authSchema = require('../model/Schema/authSchema');
const newsSchema = require('../model/Schema/newsSchema');
const postSchema = require('../model/Schema/postSchema');
class homeController {
    getHome(req, res, next) {
        var News; var Status ; var cmt;
        authSchema.findById(req.cookies.userCookie)
            .then(async (usermain) => {
                await newsSchema.find({}).then((news) => {
                    news = news.map(data => data.toObject());
                    News = news;
                });
                await postSchema.find({}).then((status) => {
                    status = status.map(data => data.toObject());
                    Status = status;
                });
                res.render('home', { News, Status, usermain: usermain.username});
            }
            ).catch(next);
    }
    postHome(req, res, next) {
        authSchema.findById(req.cookies.userCookie)
            .then( async (userpost) => {
                await postSchema.create({ userpost: userpost.username, content: req.body.status });
                res.redirect('/home');
            })
            .catch(next);

    }
}

module.exports = new homeController;