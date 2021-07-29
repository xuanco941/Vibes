const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema (
    {
        userpost : String ,
        title : String ,
        filename : String ,
        path : String ,
        comment : []
    },
    {
        timestamps: true,
        collection : 'News'
    }

)

module.exports = mongoose.model('News' , News);