const authSchema = require("../model/Schema/authSchema");
const newsSchema = require('../model/Schema/newsSchema');
const multer = require('multer');

var storageimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

class uploadController {

    upload = multer({ storage: storageimg }).single('file');

    postUpload(req, res, next) {
        authSchema.findById(req.cookies.userCookie).then(async (user) => {
            await newsSchema.create({
                userpost: user.username, title: req.body.title, filename: user.username + 'AND' + req.file.filename, path: req.file.path
            })
            res.redirect('/home');
        })  
    }
    getUpload(req, res) {
        res.redirect('/home');
    }
}

module.exports = new uploadController;