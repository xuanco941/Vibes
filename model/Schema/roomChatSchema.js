const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomChat = new Schema({
  roomname : String ,
  body : [],
  user1 : String ,
  user2 : String
}, {
  timestamps: true,
  collection: 'RoomChat'
});


module.exports = mongoose.model('RoomChat', RoomChat);
