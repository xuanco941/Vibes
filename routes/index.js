const authRoute = require ('./authRoute');
const homeRoute = require('./homeRoute');
const messengerRoute = require('./messengerRoute');
const authMidleware = require('../middlewares/authMiddleware');

function route(app) {
    app.use ('/' , authRoute) ;
    app.use('/' , authMidleware , homeRoute , messengerRoute );   
}


module.exports = route;