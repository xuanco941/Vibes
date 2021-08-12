
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
        var allRoom;
        var user, text, roomName;
        authSchema.findById(req.cookies.userCookie)
            .then(async (usermain) => {
                await usermain.roomname.forEach(async (e) => {
                    await roomChatSchema.find({ roomname: e }).then((rooms) => {

                        rooms.forEach((room) => {
                            console.log(room);
                            console.log(room.user1, room.user2, room.roomname)
                            if (room.user1 != usermain.username) {
                                user = room.user1;
                            }
                            if (room.user2 != usermain.username) {
                                user = room.user2;
                            }
                            text = room[room.length - 1].text;
                            roomName = room.roomname;
                            console.log(user, text, roomName);
                        })
                    })
                });
                await roomChatSchema.findOne({ roomname: req.params.room }).then((room) => {
                    bodyRoom = room.body;
                    if (room.user1 != usermain.username) {
                        userchat = room.user1;
                    }
                    if (room.user2 != usermain.username) {
                        userchat = room.user2;
                    }
                });
                res.render('messenger', { usermain: usermain.username, nameRoom: req.params.room, bodyRoom: bodyRoom, userchat: userchat, allRoom });
            })
            .catch(() => res.redirect('/vibes/error'));
    }
}

module.exports = new messengerController;