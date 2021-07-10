
const authSchema = require('../model/Schema/authSchema') ;
const newsSchema = require('../model/Schema/newsSchema');

class messengerController{
    getMessenger(req , res , next) { 
        res.render('messenger');
    }
}

module.exports = new messengerController;