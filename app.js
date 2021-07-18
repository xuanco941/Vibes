const express = require('express');
const app = express();
//socket.io

const server = require('http').createServer(app);
const io = require('socket.io')(server);

//body parse
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//use handlebars
const exphbs = require('express-handlebars');
const hdb = require('./controllers/handlebarsHelper')
app.engine('handlebars', hdb.engine);
app.set('view engine', 'handlebars');


//route static
const path = require('path');
app.use(express.static(path.join(__dirname, '')));


// connect database
const connectDataBase = require('./model/connectDataBase');
connectDataBase();
// use cookie-parse
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//multer
const multer = require('multer');



//call all route
const routes = require('./routes/index');
routes(app);


server.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
})

const authSchema = require('./model/Schema/authSchema');
const newsSchema = require('./model/Schema/newsSchema');

var usersOnline = [];
io.on('connection', (socket) => {
  socket.on('get-value-cookie', (async (valueCookie) => {
    await authSchema.findById(valueCookie).then(user => {
      if (usersOnline.indexOf(user.username) < 0) {
        usersOnline.push(user.username);
        socket.aUser = user.name;
      }
    });
    io.sockets.emit('get-all-user-online', usersOnline);
    console.log('nhung nguoi dang onl' + usersOnline.toString())

  }));
  socket.on('signout', () => {
    usersOnline.splice(usersOnline.indexOf(socket.aUser, 1));
    socket.broadcast.emit('get-all-user-online', usersOnline);
  });
  console.log('nhung nguoi onl con lai' + usersOnline.toString())

});
