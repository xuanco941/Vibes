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
const postSchema = require('./model/Schema/postSchema');

var usersOnline = [];
io.on('connect', (socket) => {
  console.log('a people connect');


  socket.on('get-value-cookie', (async (valueCookie) => {
    await authSchema.findById(valueCookie).then(user => {

      // get usermain
      socket.emit('usermain', user.username);

      //push on list peopleonline
      if (usersOnline.indexOf(user.username) < 0) {
        usersOnline.push(user.username);
      }
    });
    io.emit('get-all-user-online', usersOnline);

  }));

  //sign out

  socket.on('signout', async (valueCookie) => {
    await authSchema.findById(valueCookie).then((user) => {
      usersOnline.splice(usersOnline.indexOf(user.username), 1);
    })
    socket.broadcast.emit('get-all-user-online', usersOnline);
  });

  // typing 
  socket.on('type' , (Statusid) => {
    socket.broadcast.emit('type-focus' , Statusid)
  });
  socket.on('stop-type' , (Statusid) => {
    socket.broadcast.emit('type-blur' , Statusid)
  });


  //Comment Stt
  socket.on('Comment', (Statusid, aComment) => {
      postSchema.findOne({ _id: Statusid }).then( async (post) => {
      post.comment.push(aComment);
      await post.save();
      io.emit('aComment' , Statusid, aComment);
    })
  });

  //Comment News
  socket.on('CommentNews', (Newsid, aComment) => {
    newsSchema.findOne({ _id: Newsid }).then( async (news) => {
    news.comment.push(aComment);
    await news.save();
    io.emit('aCommentNews' , Newsid, aComment);
  })
});

});
