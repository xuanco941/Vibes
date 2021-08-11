const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomChat = new Schema({
  roomname : String ,
  body : []
}, {
  timestamps: true,
  collection: 'RoomChat'
});


module.exports = mongoose.model('RoomChat', RoomChat);
