
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
        var userchat;
        var bodyRoom;
        authSchema.findById(req.cookies.userCookie)
            .then(async (usermain) => {
                await roomChatSchema.findOne({ roomname: req.params.room }).then((room) => {
                    bodyRoom = room.body;
                    if(room.user1 != usermain.username) {
                        userchat = room.user1;
                    } 
                    if(room.user2 != usermain.username){
                        userchat = room.user2;
                    }
                });
                res.render('messenger', { usermain: usermain.username, nameRoom: req.params.room ,bodyRoom : bodyRoom , userchat : userchat });
            })
            .catch(() => res.redirect('/vibes/error'));
    }
}

module.exports = new messengerController;