const authSchema = require('../model/Schema/authSchema');
const newsSchema = require('../model/Schema/newsSchema');
const postSchema = require('../model/Schema/postSchema');
class pageController {
    async getPage(req, res, next) {
        var News; var Status;
        var numAll;
        var skipNews = 9 * req.params.page;
        var skipPost = 6 * req.params.page;
        if (req.params.page == 1) {
            skipNews = 0;
            skipPost = 0;
        }
        await newsSchema.find({}).then((data1) => {
            numAll = data1.length;
        });
        await postSchema.find({}).then((data2) => {
            numAll = numAll + data2.length;
        });
        if ((req.params.page) > (numAll / 15 + 1)) {
            res.redirect('/vibes/error');
        }
        else {
            authSchema.findById(req.cookies.userCookie)
                .then(async (user) => {
                    var queryNews = newsSchema.find({}).sort({ index: 'desc' }).skip(skipNews).limit(9);
                    var queryPost = postSchema.find({}).sort({ index: 'desc' }).skip(skipPost).limit(6);
                    await queryNews.exec(async (err, news) => {
                        news = news.map(data => data.toObject());
                        News = await news;
                    });
                    await queryPost.exec(async (err, status) => {
                        status = status.map(data => data.toObject());
                        Status = await status;
                        res.render('home', { News, Status, usermain: user.username, countPage: numAll / 15 });
                    });
                }
                ).catch(next);
        }
    }

    async postPage(req , res , next){
        var index;
        await postSchema.find({}).then((data) => {
            index = data.length;
        });
        authSchema.findById(req.cookies.userCookie)
            .then(async (userpost) => {
                await postSchema.create({ userpost: userpost.username, content: req.body.status, index: index });
                res.redirect('/home');
            })
            .catch(next);
    }
}

module.exports = new pageController;