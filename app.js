const express = require('express');
const app = express();

// connect database
const connectDataBase = require('./model/connectDataBase');
connectDataBase();

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


// use cookie-parse
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//multer
const multer = require('multer');



//call all route
const routes = require('./routes/index');
routes(app);

const Port = process.env.Port || 3000;

server.listen(Port, () => {
  console.log(`Example app listening at port ${Port}`);
})




const authSchema = require('./model/Schema/authSchema');
const newsSchema = require('./model/Schema/newsSchema');
const postSchema = require('./model/Schema/postSchema');

var usersOnline = [];
io.on('connect', (socket) => {

  console.log('a people connect');
  
  //get-10-element infinity-scroll
  // socket.on('get-10-element', async (statusLength, newsLength) => {
  //   var queryStatus = postSchema.find({}).skip(statusLength).limit(5);
  //   var queryNews = newsSchema.find({}).skip(newsLength).limit(5);
  //   await queryStatus.exec((err, status) => {
  //     if (status) {
  //       socket.emit('next-status', status);
  //     }
  //   });
  //   await queryNews.exec((err, news) => {
  //     if (news) {
  //       socket.emit('next-news', news);
  //     }
  //   });
  // });



  //get userlike
  socket.on('get-user-like-news', async (ID) => {
    await newsSchema.findById(ID).then((aPost) => {
      socket.emit('user-like-news', aPost.usermatch)
    })
  });
  socket.on('get-user-like-stt', async (ID) => {
    await postSchema.findById(ID).then((aPost) => {
      socket.emit('user-like-stt', aPost.usermatch)
    })
  });


  //match
  socket.on('matchnews', (ID, count, usermatch) => {
    newsSchema.findById(ID).then((news) => {
      news.match = count;
      if (news.usermatch.indexOf(usermatch) < 0) {
        news.usermatch.push(usermatch);
      }
      news.save();
      io.emit('count-match-news', ID, news.match);
    });
  });

  socket.on('matchstatus', (ID, count, usermatch) => {
    postSchema.findById(ID).then((post) => {
      post.match = count;
      if (post.usermatch.indexOf(usermatch) < 0) {
        post.usermatch.push(usermatch);
      }
      post.save();
      io.emit('count-match-status', ID, post.match);
    });
  })



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
  socket.on('type', (Statusid) => {
    socket.broadcast.emit('type-focus', Statusid)
  });
  socket.on('stop-type', (Statusid) => {
    socket.broadcast.emit('type-blur', Statusid)
  });


  //Comment Stt
  socket.on('Comment', (Statusid, aComment) => {
    postSchema.findOne({ _id: Statusid }).then(async (post) => {
      post.comment.push(aComment);
      await post.save();
      io.emit('aComment', Statusid, aComment);
    })
  });

  //Comment News
  socket.on('CommentNews', (Newsid, aComment) => {
    newsSchema.findOne({ _id: Newsid }).then(async (news) => {
      news.comment.push(aComment);
      await news.save();
      io.emit('aCommentNews', Newsid, aComment);
    })
  });
});
