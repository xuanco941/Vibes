const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  userpost: String,
  content: String,
  comment: [],
  match : Number,
  usermatch : []
}, {
  timestamps: true,
  collection: 'Post'
});


module.exports = mongoose.model('Post', Post);
