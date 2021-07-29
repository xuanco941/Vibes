const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  userpost: String,
  content: String,
  comment: []
}, {
  timestamps: true,
  collection: 'Post'
});


module.exports = mongoose.model('Post', Post);
