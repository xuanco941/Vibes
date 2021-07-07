const express = require('express');
const app = express();

//use handlebars
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//route static
const path = require('path') ;
app.use(express.static(path.join(__dirname , '')));

//body parse
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// connect database
const connectDataBase = require('./model/connectDataBase');
connectDataBase();
// use cookie-parse
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//call all route
const routes = require('./routes/index');
routes(app);

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
})
//https://xuanco941@github.com/xuanco941/Vibes.git
