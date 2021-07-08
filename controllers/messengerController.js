
const authSchema = require('../model/Schema/authSchema') ;


class messengerController{
    getMessenger(req , res) {
        res.render('messenger' , { foo : 'Foo'})
    }
}

module.exports = new messengerController;