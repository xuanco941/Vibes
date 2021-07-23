const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema (
    {
        userpost : String ,
        title : String ,
        filename : String ,
        path : String ,
        comment : {
            type: Map ,
            of : String
        }
    },
    {
        timestamps: true,
        collection : 'News'
    }

)

module.exports = mongoose.model('News' , News);