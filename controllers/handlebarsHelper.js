const exphbs  = require('express-handlebars');
const hdb = exphbs.create({
    defaultLayout: 'main',
    helpers:{
        usernam : function(value){
            return value = '';
        }
    }
})

module.exports = hdb;