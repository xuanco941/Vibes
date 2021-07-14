const authSchema = require("../model/Schema/authSchema");
const newsSchema = require('../model/Schema/newsSchema');

class uploadController {
    postUpload(req, res, next) {
        res.send(req.file);
    }
    getUpload(req, res) {
        res.redirect('/home');
    }
}

module.exports = new uploadController;