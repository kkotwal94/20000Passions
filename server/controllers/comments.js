var User = require('../models/user');
var Post = require('../models/posts');
var Comment = require('../models/comments');


exports.getComment = function(req, res) {
	 var id = req.params.comment;
        Comment.findById(id, function (err, comments) {
            res.json(comments);
        });
}

exports.createComment = function(req, res) {
	    var id = req.params.postid;
    var comments = new Comment();
   
    var myDate = Date();
    var author = req.user.email;
    var owner = req.user;
    
    comments.author = author;
    comments.date = myDate;
    comments.owner = owner;
    comments.body = req.body.body;
    
    req.user.comments.push(comments);
    req.user.save();
    Post.findById(id, function(err, post){
        if (post!=null) {
        comments.post = post;
            post.comments.push(comments);
            post.allComments = post.allComments + 1;
        post.save();
        comments.save();
    }

    });

    res.json(req.body);
}


exports.editComment = function(req, res){
	var user = req.params.user;
        var cid = req.params.id;
        
        
        Comment.findById(cid, function (err, comment) {
            comment.body = req.body.body;
            
            comment.save();
            res.json(comment);
                //res.redirect('/posts/' + pid)
        });
}

exports.deleteComment = function(req, res) {
	var postid = req.params.postid;
        var commentid = req.params.id;
        var userid = req.params.user;
        if(req.user._id != userid) {
            res.redirect('/posts/' + postid);
        }
        //removing comment, subcomments

        Comment.findById(commentid, function(err, comm) {
            if(err) throw err;
            if(comm.comments.length == 0) {
                comm.remove(function(err) {
                    if(err) throw err;
                    //res.redirect('/gallery/' + postid);

                    Post.findById(postid, function(err, post) {
                        if(err) throw err;
                        post.allComments = post.allComments - 1;
                        post.save();
            
                        });
                    //res.redirect('/gallery/' + postid);
                    });
                }
            else {
            comm.body = "[deleted]";
            comm.author = "[deleted]";
            
  
         Post.findById(postid, function(err, post) {
            if(err) throw err;
            post.allComments = post.allComments - 1;
            post.save();
            comm.save();
         });
        //res.redirect('/gallery/' + postid);
    }
        });
   res.end();
}
exports.upvoteComment = function(req, res){
	var id = req.params.upvote;
        
        if (contains(req.user.upvotedC, id)) {
            req.user.save();
            
            Comment.findById(id, function (err, comments) {
                if (comments == null) {
                    res.json(comments);
                }
                else {
                comments.downvote(function (err, comment) {
                    var uid = comments.owner;
                    User.findById(uid, function (err, users) {
                        users.upvotes = users.upvotes - 1;
                        users.save();
                        res.json(comments);
                    });
                });
            }
            });
        }
        else {
            
            Comment.findById(id, function (err, comments) {
                if(comments == null) {
                    res.json(comments);
                }
                else {
                comments.upvote(function (err, comment) {
                    User.findById(comments.owner, function (err, users) {
                        users.upvotes = users.upvotes + 1;
                        req.user.upvotedC.push(comments);
                        req.user.save();
                        users.save();
                        res.json(comments);
                    });
                });
            }
            });
        }

    
    };


exports.downvoteComment = function(req, res) {
	var id = req.params.downvote;
        if (contains(req.user.downvotedC, id)) {
            req.user.save();
            
            Comment.findById(id, function (err, comments) {
                if (comments == null) {
                    res.json(comments);
                }
                else {
                comments.upvote(function (comment, err) {
                    var uid = comments.owner;
                    User.findById(uid, function (err, users) {
                        users.upvotes = users.upvotes + 1;
                        users.save();
                        res.json(comments);
                    });
                });
            }
            });
        }
        else {
            
            Comment.findById(id, function (err, comments) {
                if (comments == null) {
                    res.json(comments);
                }
                else {
                comments.downvote(function (comment, err) {
                    var uid = comments.owner;
                    User.findById(uid, function (err, users) {
                        users.upvotes = users.upvotes - 1;
                        req.user.downvotedC.push(comments);
                        req.user.save();
                        users.save();
                        res.json(comments);
                    });
                });
            }
            });
        }
};

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