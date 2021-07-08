const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

  const User = new Schema({
    username : String , 
    password : String ,
    _name : String 
    } , {
    collection: 'User'
  });


  module.exports = mongoose.model('User', User);
