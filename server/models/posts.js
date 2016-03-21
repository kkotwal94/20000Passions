var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var PostSchema = new mongoose.Schema({
    title     : String,
    body      : String,
    author    : String,
    thumbnail : String, 
    videoURL  : {type: mongoose.Schema.Types.ObjectId},
    date      : { type: Date }, 
    upvotes   : { type: Number, default: 0 },
    comments  : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    allComments : {type: Number, default: 0},
    owner     : { type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    views     : { type:Number, default: 0}
});



PostSchema.methods.upvote = function (cb) {
    this.upvotes += 1;
    this.save(cb);
};

PostSchema.methods.downvote = function (cb) {
    this.upvotes -= 1;
    this.save(cb);
};
PostSchema.plugin(deepPopulate);
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;