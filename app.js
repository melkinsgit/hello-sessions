var express = require('express');   //Need express...
var logger = require('morgan');   //Enable logging
var session = require('express-session')  //To handle sessions
var parseurl = require('parseurl') //get the actual url requested, will use to count visits to particular pages.

app = express();         //Create app
app.use(logger('dev'));   //Initialize logger - do this first

app.use(session({
  secret: "random_number_here"  //replace in production app
}));

//All routes will run this function first/
//Calling next() at the end of this function will run the next matching route handler
app.use(function(req, res, next){

  var views = req.session.views
  if (!views) {
    views = req.session.views = {}; //first time visitor - set up view counter
  }

  var path = parseurl(req).pathname   //get the URL used in this request

  if (!req.session.views[path]) {    //If no record for this URL yet...
    req.session.views[path] = 1;
  } else {                           //User has already visited this page, add 1 to page count
    req.session.views[path]++ ;
  }

  next();    //And call the next matching route handler

});


app.get('/', function(req, res, next){
  res.send("home page")
})

app.get('/cat', function(req, res){
  res.send('Cat page')
});

app.get('/fish', function(req, res) {
  res.send('Fish page');
});


app.get('/counts', function(req, res){
  res.send("You have visited these pages, " + JSON.stringify(req.session.views))
});

app.listen(3040);  //And listen on port 3040.
