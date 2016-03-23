/**
 * Routes for express app
 */
var express = require('express');
var users = require('../controllers/users');
var posts = require('../controllers/posts');
var comments = require('../controllers/comments');
var User = require('../models/user');
var Post = require('../models/posts');
var Comment = require('../models/comments');
var mongoose = require('mongoose');
var _ = require('lodash');
//var mongo = require('mongodb');
var fs = require("fs");
var thumbler = require('video-thumb');
var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');
var useragent = require('express-useragent');
var Busboy = require('busboy');
var Grid = require('gridfs-stream');
var ffmpeg = require('fluent-ffmpeg');
  Grid.mongo = mongoose.mongo;
  var gfs = Grid(mongoose.connection.db);
module.exports = function(app, io, passport) {
  // user routes
  var usernames = {};
  var numUsers = 0;
  var rooms = ['Lobby','Dota 2 Chat','Joke Chat'];
  
  //users
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.get('/logout', users.getLogout);
  app.get('/getProfile', users.getProfile);
  app.get('/getCompleteProfile', users.getCompleteProfile);
  app.post('/updateProfile', users.updateProfile);
  app.get('/getAnotherUsersProfile/:id', users.getAnotherUsersProfile);

  //posts
  app.post('/posts', posts.createPost);
  app.get('/allPosts', posts.allPosts);
  app.put('/posts/:upvote/upvote', posts.upvotePost);
  app.put('/posts/:downvote/downvote', posts.downvotePost);
  app.get('/posts/:posts/getPost', posts.getPost);
  app.get('/posts/:posts/getPost/comments', posts.getNestedComments);
  app.post('/edit/:user/:id', posts.updatePost);
  app.post('/posts/:id', posts.addNestedComment);
  app.put('/posts/delete/:user/:id', posts.removePost);
  app.put('/posts/:posts/updateViewCount', posts.updateViewCount);



  //comments
  app.get('/comment/:comment/getComment', comments.getComment);
  app.post('/submit/:postid/comments', comments.createComment);
  app.post('/editC/:user/:id', comments.editComment);
  app.put('/comments/:upvote/upvote', comments.upvoteComment);
  app.put('/comments/:downvote/downvote', comments.downvoteComment);
  app.put('/post/:postid/comment/delete/:user/:id', comments.deleteComment);


  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go 
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // topic routes
  

  /*app.post('/file/video', function(req, res) {
    var filename = req.body.filename;
    //console.log(req.body);
    var path = "/Users/Karan/Documents/PersonalProjects/20000Pitches/movie.mp4";

    var type = req.body.filetype;
    var dirname = require("path").dirname(__dirname);
    //var conn = req.conn;
    var Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;
    var gfs = Grid(mongoose.connection.db);
    var read_stream = fs.createReadStream(path);

    var writestream = gfs.createWriteStream({
      filename: filename
    });

    read_stream.pipe(writestream);
    res.json(req.body);
  });
*/

  app.post('/file/video', function(req, res) {
  //console.log(req.body);
  var busboy = new Busboy({ headers : req.headers });
  var fileId = new mongoose.mongo.ObjectId();
  //console.log(req.body);
  
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //console.log('got file', filename, mimetype, encoding);
    var writeStream = gfs.createWriteStream({
      _id: fileId,
      filename: filename,
      mode: 'w',
      content_type: mimetype,
    });
    file.pipe(writeStream);
  }).on('finish', function() {
    // show a link to the uploaded file
    req.user.videos.push(fileId);
    req.user.save();
    //console.log(req.user);
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('<a href="/file/' + fileId.toString() + '">download file</a>');

    
    /*var proc = new ffmpeg('/Documents/20000pitches/parkour.mp4')
  .takeScreenshots({
      count: 1,
      timemarks: [ '600' ] // number of seconds
    }, '/', function(err) {
    console.log('screenshots were saved')
  });
*/
  });

  req.pipe(busboy);
});



app.get('/file/:id', function(req, res) {
  gfs.findOne({ _id: req.params.id }, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    
    var readstream = gfs.createReadStream({
      _id: file._id
    });

    readstream.on("error", function(err) {
      console.log("Got error while processing stream " + err.message);
      res.end();
    });

    readstream.pipe(res);
  });
});
  // Retrieves all topics on any endpoint for demonstration purposes
  // If you were indeed doing this in production, you should instead only
  // query the Topics on a page that has topics
  app.get('*', function(req, res, next) {
    Topic.find({}).exec(function(err, topics) {
      if(!err) {
        var topicmap = _.indexBy(topics, 'id');
        // We don't want to be seeding and generating markup with user information
        var user = req.user ? { authenticated: true, isWaiting: false, email: req.user.email, id: req.user._id, profile: req.user.profile} : { authenticated: false, isWaiting: false };
        // An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during
        // that request/response cycle (if any). Otherwise, this property is identical to app.locals
        // This property is useful for exposing request-level information such as request path name, authenticated user, user settings, and so on.
        // pass in data to be seeded into the TopicStore
        res.locals.data =  {
          TopicStore: { topics: topicmap},
          UserStore: { user: user }
        };
        next();
      }else {
        console.log('Error in first query');
        res.status(500).send(err);
      }
    });
  });

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.get('*', function (req, res, next) {
    var html = App(JSON.stringify(res.locals.data || {}), req, res);
    html = html.replace("TITLE", Header.title)
                .replace("META", Header.meta);

    if(process.env.NODE_ENV === 'devhotloader') {
      html = html.replace("LINK", '');
    } else {
      html = html.replace("LINK", Header.link);
    }

    res.contentType = "text/html; charset=utf8";
    
    res.end(html);
  });

  io.on('connection', function(socket) {

  socket.on('adduser', function(username) {
    socket.username = username;
    //adding our name to the global scope
    //console.log(username);
    socket.room = 'Lobby';
    usernames[username] = username;
    io.emit('updateusers', usernames);
    //usernames[username] = socket;
    //say this user has connected to client
    socket.join('Lobby');
    numUsers++;
    socket.broadcast.emit('chat message', socket.username + ' has connected to the room')
    socket.broadcast.to('Lobby').emit('chat message', socket.username+' has connected to this Lobby');
    socket.emit('updaterooms',rooms,'Lobby');

});
//creating our own server?
  socket.on('create', function(room) {
    rooms.push(room);
    socket.emit('updaterooms', rooms, socket.room);
  });
  

socket.on('changenickname', function(new_username) {
   var temp;
   temp = usernames[socket.username];
   delete usernames[socket.username];
   socket.username = new_username;
   usernames[new_username] = new_username;
   io.emit('updateusers', usernames);
   //usernames[new_username] = socket;
   io.emit('chat message', temp +' has changed his name to ' + socket.username)
  });

  socket.on('chat message', function(msg) {
   socket.broadcast.emit('chat message',  msg);
});

  socket.on('switchRoom', function(newroom) {
  var oldroom;
  oldroom = socket.room;
  socket.leave(socket.room);
  socket.join(newroom);
  socket.emit('chat message', 'you have connected to ' + newroom);
  socket.broadcast.to(oldroom).emit('chat message', socket.username + ' has left this room');
  socket.room = newroom;
  socket.broadcast.to(newroom).emit('chat message', socket.username+' has joined the room!');
  socket.emit('updaterooms',rooms, newroom);
  });

  socket.on('disconnect', function() {
    //removes the username from global array of username
    delete usernames[socket.username];
    numUsers--;
    //update list of users in chat, client side
    io.emit('updateusers', usernames);
    //tell chat room user has left
    socket.broadcast.emit('chat message', socket.username + ' has disconnected');
    socket.leave(socket.room);
});
  
 socket.on('removeRoom', function(currRoom, nextRoom) {
  for (var i = 0; i < rooms.length; i++)  { //cant delete lobby!
     if (rooms[i] === currRoom){
       rooms[i] = nextRoom;
  } 
    }
   
});
   socket.on('getUsers', function() {
  socket.emit('updateusers', usernames);
  });

});

};
