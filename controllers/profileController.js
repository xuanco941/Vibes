const authSchema = require('../model/Schema/authSchema');
const multer = require('multer');

var storageimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'avatar')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

class profileController {

    //lấy ra profile của user qua URl , res.params.[name] , /:name dùng làm biến cho route
    //var cho handlebars : usermain là tên tài khoản truy cập , username là tài khoản khách

    getProfile(req, res, next) {

        var usermain;
        authSchema.findById(req.cookies.userCookie).then(user => usermain = user.username);
        authSchema.findOne({ username: req.params.username })
            .then(user => {
                if (user) {
                    var birthday;
                    if (user.birthday) {
                        var day = user.birthday.getDate();
                        var month = user.birthday.getMonth() + 1;
                        var year = user.birthday.getFullYear();

                        if (day < 10) { day = '0' + day; }

                        if (month < 10) { month = '0' + month; }
                        birthday = `${year}-${month}-${day}`;
                    }

                    res.render('profile', { user: user.toObject(), usermain: usermain, birthday });
                }
                else {
                    res.render('error', { layout: false });
                }
            }).catch(next);
    }

    postProfile(req, res, next) {
        authSchema.findById(req.cookies.userCookie).then((usermain) => {
            usermain._name = req.body.FullName;
            usermain.username = req.body.userName;
            usermain.birthday = req.body.birthday;
            usermain.city = req.body.city;
            usermain.link = req.body.link;
            usermain.save();
            res.redirect(`/${usermain.username}`);
        })
            .catch(next);
    }

    getAvatar(req, res, next) {
        authSchema.findById(req.cookies.userCookie).then(user => res.redirect(`/${user.username}`)).catch(next);
    }

    upload = multer({ storage: storageimg }).single('file');

    postAvatar(req, res, next) {
        authSchema.findById(req.cookies.userCookie).then((user) => {
            var path = req.file.path;
            if (path.indexOf('.png') > -1 || path.indexOf('.jpg') > -1 || path.indexOf('.jpeg') > -1 || path.indexOf('.gif') > -1 || path.indexOf('.psd') > -1) {
                user.avatar = req.file.path;
                user.save();
            }
            res.redirect(`/${user.username}`);
        })
            .catch(next);
    }
}
module.exports = new profileController;