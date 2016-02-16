var express = require('express');   //Need express...
var logger = require('morgan');   //Enable logging
//var cookieParser = require('cookie-parser'); //handle cookies
var session = require('express-session')  //no longer need cookie-parser.

app = express();         //Create app

app.use(logger('dev'));   //Initialize logger - do this first


 app.use(session({
   secret: "av3ua3wvu9a3y89a3cqy8n9ac3wny8m"
  }));

//Create a route to the home page
app.get('/', function(req, res){
  var session = req.session;
  if (session.views) {
    session.views++
    res.send("You've been to this page " + session.views + " times ");
  } else {
    session.views = 1
    res.send("Welcome, first time visitor")
  }
})

app.get('/cat', function(req, res){
  res.send('Cat page')
});

app.get('/bird', function(req, res){
  console.log(req.cookies)
  res.send('Bird page');
});

app.get('/fish', function(req, res) {
  res.send('Fish page');
});


app.listen(3040);  //And listen on port 3040.
