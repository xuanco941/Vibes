const authSchema = require('../model/Schema/authSchema');
const newsSchema = require('../model/Schema/newsSchema');
const postSchema = require('../model/Schema/postSchema');
class homeController {
    async getHome(req, res, next) {
        var News; var Status;
        var numAll ;
        await newsSchema.find({}).then((data1) => {
            numAll = data1.length;
        });
        await postSchema.find({}).then(data2 => numAll = numAll + data2.length);
        authSchema.findById(req.cookies.userCookie)
            .then(async (user) => {
                var queryNews = newsSchema.find({}).sort({ index: 'desc' }).limit(9);
                var queryPost = postSchema.find({}).sort({ index: 'desc' }).limit(6);
                await queryNews.exec( async(err, news) => {
                    News = await news.map(data => data.toObject());
                    
                });
                await queryPost.exec( async (err, status) => {
                    Status = await status.map(data => data.toObject());
                    
                    res.render('home', { News, Status, usermain: user.username , countPage : numAll/15});
                });
            }
            ).catch(next);
    }
    async postHome(req, res, next) {
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

module.exports = new homeController;