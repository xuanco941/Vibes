
const authSchema = require('../model/Schema/authSchema');
const roomChatSchema = require('../model/Schema/roomChatSchema');

class messengerController {
    getMessenger(req, res, next) {
        var miniBoxChat = [];
        authSchema.findById(req.cookies.userCookie)
            .then(async (usermain) => {
                await usermain.roomname.forEach(async (e) => {
                    await roomChatSchema.find({ roomname: e }).then((rooms) => {
                        var user, lastestText, roomName;
                        rooms.forEach((room) => {
                            if (room.user1 != usermain.username) {
                                user = room.user1;
                            }
                            if (room.user2 != usermain.username) {
                                user = room.user2;
                            }
                            var arrText = [];
                            room.body.forEach((elm) => {
                                arrText.push(elm.text);
                            });
                            lastestText = arrText[arrText.length - 1];
                            roomName = room.roomname;

                            miniBoxChat.push({ roomName: roomName, user: user, text: lastestText });
                        })
                    });
                });
                res.render('messenger', { usermain: usermain.username, miniBoxChat });
            })
            .catch(next);
    }


    getSlugMessenger(req, res, next) {
        var userchat;
        var bodyRoom;
        var miniBoxChat = [];
        authSchema.findById(req.cookies.userCookie)
            .then(async (usermain) => {
                await usermain.roomname.forEach(async (e) => {
                    await roomChatSchema.find({ roomname: e }).then((rooms) => {
                        var user, lastestText, roomName;
                        rooms.forEach((room) => {
                            if (room.user1 != usermain.username) {
                                user = room.user1;
                            }
                            if (room.user2 != usermain.username) {
                                user = room.user2;
                            }
                            var arrText = [];
                            room.body.forEach((elm) => {

                                arrText.push(elm.text);

                            });
                            lastestText = arrText[arrText.length - 1];
                            roomName = room.roomname;

                            miniBoxChat.push({ roomName: roomName, user: user, text: lastestText });
                        })
                    });
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
                res.render('messenger', { usermain: usermain.username, nameRoom: req.params.room, bodyRoom, userchat, miniBoxChat });
            })
            .catch(() => res.redirect('/vibes/error'));
    }
}

module.exports = new messengerController;