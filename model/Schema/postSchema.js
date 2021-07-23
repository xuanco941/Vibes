const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  userpost: String,
  content: String,
  comment: {type : [] , default : {usercomment: '' , text: ''}}
}, {
  timestamps: true,
  collection: 'Post'
});


module.exports = mongoose.model('Post', Post);
