const exphbs  = require('express-handlebars');

const hdb = exphbs.create({
    defaultLayout: 'main',
    helpers:{
        foo : function(value){
            return value = 'Hi';
        }
    }
})

module.exports = hdb;