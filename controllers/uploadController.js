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
            var path = req.file.path;
            if (path.indexOf('.png') > -1 || path.indexOf('.jpg') > -1 || path.indexOf('.jpeg') > -1 || path.indexOf('.gif') > -1 || path.indexOf('.psd') > -1)  {
                await newsSchema.create({
                    userpost: user.username, title: req.body.title, filename: req.file.filename, pathImg: path
                })
            }
            if (path.indexOf('.mp4') > -1 || path.indexOf('.avi') > -1 || path.indexOf('.mkv') > -1 || path.indexOf('.wmv') > -1 || path.indexOf('.xvid') > -1)  {
                await newsSchema.create({
                    userpost: user.username, title: req.body.title, filename: req.file.filename, pathVideo: path
                })
            } 
            res.redirect('/home');
        })
            .catch(next);
    }
    getUpload(req, res) {
        res.redirect('/home');
    }
}

module.exports = new uploadController;