const authRoute = require ('./authRoute');
const homeRoute = require('./homeRoute');
const messengerRoute = require('./messengerRoute');
const authMidleware = require('../middlewares/authMiddleware');
const uploadRoute = require('./uploadRoute');

function route(app) {
    app.use ('/' , authRoute) ;
    app.use('/' , authMidleware , homeRoute , messengerRoute , uploadRoute );   
}


module.exports = route;