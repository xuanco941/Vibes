const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema (
    {
        userpost : String ,
        title : String ,
        filename : String ,
        pathVideo : {type : String , default : 'none'},
        pathImg : {type : String , default : 'none'},
        comment : [] ,
        match : {type : Number , default : 0},
        usermatch : []
    },
    {
        timestamps: true,
        collection : 'News'
    }

)

module.exports = mongoose.model('News' , News);