const authSchema = require('../model/Schema/authSchema');
const newsSchema = require('../model/Schema/newsSchema');
const postSchema = require('../model/Schema/postSchema');
class homeController {
    getHome(req, res, next) {
        var News; var Status;
        authSchema.findById(req.cookies.userCookie)
            .then( async (user) => {
                var queryNews = newsSchema.find({}).limit(5);
                var queryPost = postSchema.find({}).limit(5);
                await queryNews.exec((err, news) => {
                    news = news.map(data => data.toObject());
                    News = news;
                });
                await queryPost.exec((err, status) => {
                    status = status.map(data => data.toObject());
                    Status = status;
                    res.render('home', { News, Status, usermain: user.username });
                });
            }
            ).catch(next);
    }
    postHome(req, res, next) {
        authSchema.findById(req.cookies.userCookie)
            .then(async (userpost) => {
                await postSchema.create({ userpost: userpost.username, content: req.body.status });
                res.redirect('/home');
            })
            .catch(next);
    }
}

module.exports = new homeController;