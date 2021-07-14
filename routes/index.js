const authRoute = require ('./authRoute');
const homeRoute = require('./homeRoute');
const messengerRoute = require('./messengerRoute');
const authMidleware = require('../middlewares/authMiddleware');
const uploadRoute = require('./uploadRoute');
const profileRoute = require('./profileRoute');
const newdisplay = require('../routes/newdisplayRoute')

function route(app) {
    app.use ('/' , authRoute) ;
    app.use('/' , authMidleware ,homeRoute , messengerRoute ,uploadRoute , newdisplay ,profileRoute );
}


module.exports = route;