const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema (
    {
        userpost : String ,
        title : String ,
        filename : String ,
        uploadAt : {type : Date , default: Date.now} 
    },
    {
        collection : 'News'
    }

)

module.exports = mongoose.model('News' , News);