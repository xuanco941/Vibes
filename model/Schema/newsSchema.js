const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema (
    {
        username : String ,
        file : String ,
        historyComment : String 
    },
    {
        collection : 'News'
    }

)

module.exports = mongoose.model('News' , News);