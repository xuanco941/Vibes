
class messengerController{
    getMessenger(req , res) {
        res.render('messenger');
        
    }
}

module.exports = new messengerController;