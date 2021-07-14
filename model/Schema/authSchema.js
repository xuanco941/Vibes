const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

  const User = new Schema({
    _name : String ,
    username : String , 
    password : String 
    } , {
    collection: 'User'
  });


  module.exports = mongoose.model('User', User);
