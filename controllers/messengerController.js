
const authSchema = require('../model/Schema/authSchema');
const roomChatSchema = require('../model/Schema/roomChatSchema');

class messengerController {
    getMessenger(req, res, next) {
        authSchema.findById(req.cookies.userCookie)
            .then(usermain => {
                res.render('messenger', { usermain: usermain.username })
            }
            )
            .catch(next)
    }

    getSlugMessenger(req, res, next) {
        var userSend = [], userReceive = [];
        authSchema.findById(req.cookies.userCookie)
            .then(async (usermain) => {
                await roomChatSchema.findOne({ roomname: req.params.room }).then((room) => {
                    room.body.forEach(element => {
                        if(element.user == usermain.username) userSend.push({user : element.user , text : element.text})
                        else userReceive.push({user : element.user , text : element.text});
                    });
                });
                res.render('messenger', { usermain: usermain.username, nameRoom: req.params.room, userSend, userReceive });
            })
            .catch(() => res.redirect('/vibes/error'));
    }
}

module.exports = new messengerController;