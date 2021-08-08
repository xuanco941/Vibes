const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  userpost: String,
  content: String,
  comment: [],
  match : {type : Number , default : 0},
  usermatch : [],
  index : Number
}, {
  timestamps: true,
  collection: 'Post'
});


module.exports = mongoose.model('Post', Post);
