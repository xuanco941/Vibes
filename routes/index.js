const authRoute = require ('./authRoute');
const homeRoute = require('./homeRoute');
const messengerRoute = require('./messengerRoute');
const authMidleware = require('../middlewares/authMiddleware');
const uploadRoute = require('./uploadRoute');
const profileRoute = require('./profileRoute');
const errorRoute = require('./errorRoute');
const searchRoute = require('./searchRoute');

function route(app) {
    app.use ('/' , authRoute) ;
    app.use('/' , authMidleware ,homeRoute , messengerRoute , uploadRoute , errorRoute , searchRoute , profileRoute );
}


module.exports = route;