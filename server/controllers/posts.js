var _ = require('lodash');
var mongoose = require('mongoose');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);
var User = require('../models/user');
var Post = require('../models/posts');
var Comment = require('../models/comments');
var deep = ".comments";
var longpath = repeat(deep, 100);
var comments = 'comments' + longpath;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(mongoose.connection.db);


exports.allPosts = function (req, res) {
        Post.find({}, function (err, posts) {
            if (err) return res.status(500).send();
    if (!posts) {
        // Here is where you handle the "error".
        return res.status(404).json({
            err: "404 Not Found"
        });
    } 
            res.json(posts); 
        });
    };

exports.createPost = function(req, res) {
    var type = req.body.type;

    if(type == "upload") {
	 var posts = new Post(req.body);
        var myDate = Date();
        posts.date = myDate;
        console.log(req.body);
       
        User.findById(req.user.id, function (err, user) {
            
            user.posts.push(posts);
            user.postsCount = user.postsCount + 1;
            posts.author = user.email;
            posts.owner = user;
            posts.videoURL = user.videos[user.videos.length - 1];
            posts.save();
            console.log(posts);
            user.save();
            res.json(req.body);
        });
    }

    if(type == "youtube") {
        var posts = new Post(req.body);
        var myDate = Date();
        posts.date = myDate;
        console.log(req.body);
       
        User.findById(req.user.id, function (err, user) {
            
            user.posts.push(posts);
            user.postsCount = user.postsCount + 1;
            posts.author = user.email;
            posts.owner = user;
            posts.youtubeURL = req.body.youtubeURL;
            posts.save();
            console.log(posts);
            user.save();
            res.json(req.body);
        });
    }

    if(type == "text") {
        var posts = new Post(req.body);
        var myDate = Date();
        posts.date = myDate;
        console.log(req.body);
       
        User.findById(req.user.id, function (err, user) {
            
            user.posts.push(posts);
            user.postsCount = user.postsCount + 1;
            posts.author = user.email;
            posts.owner = user;
            posts.save();
            console.log(posts);
            user.save();
            res.json(req.body);
        });
    }
}


exports.updateViewCount = function(req, res){
    var id = req.params.posts;
    Post.findById(id, function(err, post) {
        if (err) return res.status(500).send();
        if(!post){
            return res.status(404).json({
            err: "404 Not Found"
        });
        }
        post.views = post.views + 1;
        post.save();
        res.json(req.body);
    });
}


exports.getNestedComments = function(req, res){
	var id = req.params.posts;
 Post.findById(id).deepPopulate('comments' + longpath).execAsync() //i am looking for a form, using deeppopulate funct we fill out subforms to the 6th level, because I don't think there will be more than 6 levels, and if so we can just add in more..
        .then(function (doc) { //for the doc that the async call gets
             
            res.json(doc); //we send that doc with the populated fields  
        }).catch(function (err) { //if there is a error than tell us
            res.send('Something is wrong..' + err.message) //err.message holds true error, might be vague
        });

}

exports.removePost = function(req, res) {
	 var postid = req.params.id;
        var userid = req.params.user;
        console.log("PostID: " + postid);
        console.log("UserID: " + userid);
        
        /*if(req.user._id != userid) {
            //res.redirect('/');
            console.log("Not the right user");
            res.end();
        }*/

        Post.findById(postid, function (err, post) {
            if (err) return res.status(500).send();
            var video = post.videoURL;
            //console.log(post);
            console.log("VIDEOID: " + video);
            /*var options = {_id : video}; //can be done via _id as well
                gfs.exist(options, function (err, found) {
                  if (err) return handleError(err);
                  found ? console.log('File exists') : console.log('File does not exist');
                });*/
            if(video != null || undefined) {
            gfs.findOne({_id: video}, function (err, obj) {
                if (err) return error;
                if(!obj){
            return res.status(404).json({
            err: "404 Not Found"
        });
        }
                gfs.remove(obj, function (err) {
                   if(err) return error;
                   console.log("removed"); 
                   Post.findByIdAndRemove(postid, function(err) {
                        if(err) throw err;
                     
                        res.end();
                    });
                });
            });
            } else {
                Post.findByIdAndRemove(postid, function(err) {
                        if(err) throw err;
                     
                        res.end();
                    });
            }
            
            /*var collection = db.collection('fs.files');     
            collection.findOne({_id: video }, function (err, obj) {
                if (err) return cb(err); // don't forget to handle error/
                gfs.remove(obj, function(err){
                  if (err) return false;
                  return true;          
                })
            });
        */
        });

        /*Post.findByIdAndRemove(postid, function(err) {
            if(err) throw err;
         
            res.end();
        });*/
}

exports.addNestedComment = function(req, res) {
	var id = req.params.id;
        var comments = new Comment();
        var myDate = Date();
        var author = req.user.local.email;
        var owner = req.user;
        
        comments.author = author;
        comments.date = myDate;
        comments.owner = owner;
        comments.body = req.body.body;
        comments.pComment = req.body.parentCommentId;
        Post.findById(id, function (err, post) {
            if (err) return res.status(500).send();
            if(!post){
            return res.status(404).json({
            err: "404 Not Found"
        });
        }
            if (post != null) {
            post.allComments = post.allComments + 1;
            
            req.user.local.comments.push(comments);
            req.user.save();
            comments.post = post;
            Comment.findById(req.body.parentCommentId, function (err, comm) {
            if(comm != null) {
                comments.nthNode = comm.nthNode + 1;
                comments.save();
                comm.comments.push(comments); //pushing in nested comment to parent
                comm.save();
                post.save();
                }
            });
           
         }
               
        });

        res.redirect('/posts/' + id);
    }

exports.updatePost = function(req, res){
	var user = req.params.user;
        var pid = req.params.id;
        //console.log(user);
      //console.log(pid);
            Post.findById(pid, function (err, post) {
                if (err) return res.status(500).send();
                if(!post){
            return res.status(404).json({
            err: "404 Not Found"
        });
        }
                post.body = req.body.body;
                post.title = req.body.title;
                post.thumbnail = req.body.thumbnail;
                post.save();
            res.json(post);
                //res.redirect('/posts/' + pid)
            });
}

exports.upvotePost = function(req, res) {
     var id = req.params.upvote; //get id by param
     

     if(contains(req.user.upvotedP, id)) {
        req.user.save();
     Post.findById(id, function(err, posts) {
        if (posts == null) {
            res.json(posts);
        }
        else {
        posts.downvote(function(err, post) {
        var uid = posts.owner;
        User.findById(uid, function(err, users) {
            if (err) return res.status(500).send();
            users.upvotes = users.upvotes - 1;
            users.save();
            res.json(posts);
        });
    });
    }
     });
    }
    else {
        
        Post.findById(id, function(err, posts) {
            if(posts == null) {
                res.json(posts);
            }
            else {
        posts.upvote(function(err, post) {
        
        
        User.findById(posts.owner, function(err, users) {

            users.upvotes = users.upvotes + 1;
                        req.user.upvotedP.push(posts);
                        req.user.save();
            users.save();
            res.json(posts);
        });
    });
    }
     });

    }

    
   };

exports.downvotePost = function(req, res) {
     var id = req.params.downvote;

     if(contains(req.user.downvotedP, id)) {
        req.user.save();
     Post.findById(id, function(err, posts) {
        if(posts == null) {
            res.json(posts);
        }
        else {
        posts.upvote(function(post, err) {
        var uid = posts.owner;
        User.findById(uid, function(err, users) {
            users.upvotes = users.upvotes + 1;
            users.save();
            res.json(posts);
        });
      });
    }
     });
    }
    else {
        
        Post.findById(id, function(err, posts) {
            if(posts == null) {
                res.json(posts);
            }
            else {
        posts.downvote(function(post, err) {
        var uid = posts.owner;
        User.findById(uid, function(err, users) {
            users.upvotes = users.local.upvotes - 1;
            req.user.downvotedP.push(posts);
            req.user.save();
            users.save();
            res.json(posts);
        });
    });
    }
     });
    }

    
   };


exports.getPost = function(req, res) {
	 var id = req.params.posts;
    Post.findById(id, function(err, posts) {
        if (err) return res.status(500).send();
        if(!posts){
            return res.status(404).json({
            err: "404 Not Found"
        });
        }
        posts.populate('comments', function(error, post) {


        res.json(post);
      });
    });
}

function repeat(pattern, count) {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;

}

function contains(arr, id) {
    for (var i = 0; i < arr.length; i++) {
       
        
        if (arr[i] == id) {
            
            arr.splice(i, 1);
            
            return true;
        }
    }
    
    return false;

}