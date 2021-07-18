const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

  const Post = new Schema({
    userpost : String , 
    content : String ,
    uploadAt : {type : Date , default: Date.now}
    } , {
    collection: 'Post'
  });


  module.exports = mongoose.model('Post', Post);
