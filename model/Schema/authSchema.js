const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  _name: String,
  username: String,
  password: String,
  birthday : Date ,
  city : String ,
  link : String ,
  avatar : {type : String , default : '../public/img/avatar-default.png'},
  roomname: []
}, {
  timestamps: true,
  collection: 'User'
});


module.exports = mongoose.model('User', User);
