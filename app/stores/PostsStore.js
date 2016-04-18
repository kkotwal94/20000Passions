import Immutable from 'immutable';
import PostsActions from 'actions/PostsActions';
import alt from 'altInstance';

/**
 * Flux Explanation of Store:
 * Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but
 * they manage the state of many objects. Nor are they the same as Backbone's collections. More than simply managing a
 * collection of ORM-style objects, stores manage the application state for a particular domain within the application.
 *
 * A store registers itself with the dispatcher and provides it with a callback. This callback receives a data payload
 * as a parameter. The payload contains an action with an attribute identifying the action's type. Within the store's
 * registered callback, a switch statement based on the action's type is used to interpret the payload and to provide the
 * proper hooks into the store's internal methods. This allows an action to result in an update to the state of the store,
 * via the dispatcher. After all the stores are updated, they broadcast an event declaring that their state has changed,
 * so the views may query the new state and update themselves.
 *
 * Alt Implementation of Stores:
 * These are the stores returned by alt.createStore, they will not have the methods defined in your StoreModel because flux
 * stores do not have direct setters. However, any static methods defined in your StoreModel will be transferred to this object.
 *
 * Please note: Static methods defined on a store model are nothing more than synthetic sugar for exporting the method as a public
 * method of your alt instance. This means that `this` will be bound to the store instance. It is recommended to explicitly export
 * the methods in the constructor using StoreModel#exportPublicMethods.
 *
 */
class PostsStore {

  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.posts = [];
    //this.singlePost = [];
    this.nestedComments = [];
    this.userCompleteData = [];
    this.userPosts = [];
    this.singlePost = {comments: []};
    this.postComments = [];
    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleAllPosts: PostsActions.ALL_POSTS,
      handleAllPostsSuccess: PostsActions.ALL_POSTS_SUCCESS,
      handleAllPostsError: PostsActions.ALL_POSTS_ERROR,
      handleGetPosts: PostsActions.GET_POSTS,
      handleGetPostsSuccess: PostsActions.GET_POSTS_SUCCESS,
      handleGetPostsError: PostsActions.GET_POSTS_ERROR,
      handleGetNestedComments: PostsActions.GET_NESTED_COMMENTS,
      handleGetNestedCommentsSuccess: PostsActions.GET_NESTED_COMMENTS_SUCCESS,
      handleGetNestedCommentsError: PostsActions.GET_NESTED_COMMENTS_ERROR,
      handleUpvote: PostsActions.UPVOTE_POST,
      handleUpvoteSuccess: PostsActions.UPVOTE_POST_SUCCESS,
      handleUpvoteError: PostsActions.UPVOTE_POST_ERROR,
      handleDownvote: PostsActions.DOWNVOTE_POST,
      handleDownvoteSuccess: PostsActions.DOWNVOTE_POST_SUCCESS,
      handleDownvoteError: PostsActions.DOWNVOTE_POST_ERROR,
      handleEditPost: PostsActions.EDIT_POST,
      handleEditPostSuccess: PostsActions.EDIT_POST_SUCCESS,
      handleEditPostError: PostsActions.EDIT_POST_ERROR,
      handleAddNestedComment: PostsActions.ADD_NESTED_COMMENT,
      handleAddNestedCommentSuccess: PostsActions.ADD_NESTED_COMMENT_SUCCESS,
      handleAddNestedCommentError: PostsActions.ADD_NESTED_COMMENT_ERROR,
      handleRemovePost: PostsActions.REMOVE_POST,
      handleRemovePostSuccess: PostsActions.REMOVE_POST_SUCCESS,
      handleRemovePostError: PostsActions.REMOVE_POST_ERROR,
      handleUpdateViewCount: PostsActions.UPDATE_VIEW_COUNT,
      handleUpdateViewCountSuccess: PostsActions.UPDATE_VIEW_COUNT_SUCCESS,
      handleUpdateViewCountError: PostsActions.UPDATE_VIEW_COUNT_ERROR,
      handleGetCompleteProfile: PostsActions.GET_COMPLETE_PROFILE,
      handleGetCompleteProfileSuccess: PostsActions.GET_COMPLETE_PROFILE_SUCCESS,
      handleGetCompleteProfileError: PostsActions.GET_COMPLETE_PROFILE_ERROR,
      handleUpvoteComment: PostsActions.UPVOTE_COMMENT,
      handleUpvoteCommentSuccess: PostsActions.UPVOTE_COMMENT_SUCCESS,
      handleUpvoteCommentError: PostsActions.UPVOTE_COMMENT_ERROR,
      handleEditComment: PostsActions.EDIT_COMMENT,
      handleEditCommentSuccess: PostsActions.EDIT_COMMENT_SUCCESS,
      handleEditCommentError: PostsActions.EDIT_COMMENT_ERROR,
      handleDeleteComment: PostsActions.DELETE_COMMENT,
      handleDeleteCommentSuccess: PostsActions.DELETE_COMMENT_SUCCESS,
      handleDeleteCommentError: PostsActions.DELETE_COMMENT_ERROR
    });
  }

  bootstrap() {
    this.posts = [];
  }

  handleAllPosts() {
    this.emitChange();
  }

  handleAllPostsSuccess(data) {
    this.posts = data;
    //console.log(data);
    /*for(let i = 0; i< this.posts.length; i++){
      for(let j = 0; j < this.userCompleteData.upvotedP.length; j++) {
        if(this.posts[i]._id == this.userCompleteData.upvotedP[j]) {
          this.posts[i].isUpvoted = true;
        }
        
        
      }
    }*/
    this.emitChange();
  }

  handleAllPostsError(error){
    this.emitChange(error);
  }

  handleGetPosts() {
    this.emitChange();
  }

  handleGetPostsSuccess(data) {
    this.singlePost = data.posts;

    if(this.userCompleteData.upvotedP != null) {
    for(var i = 0; i < this.userCompleteData.upvotedP.length; i++) {
      if(this.userCompleteData.upvotedP[i] == data.id) {
        //console.log("Trying to unvote");
        //this.userCompleteData.posts[i].upvotes = this.userCompleteData.posts[i].upvotes - 1;
        //this.userCompleteData.posts[i].isUpvoted = false;
        this.singlePost.isUpvoted = true;
      }
      else {
      if(this.userCompleteData.upvotedP[i] == data.id) {
        //console.log("Trying to vote");
        //this.userCompleteData.posts[i].upvotes = this.userCompleteData.posts[i].upvotes + 1;
        this.singlePost.isUpvoted = false;
        //this.userCompleteData.posts[i].isUpvoted = true;
      }
    }
  }
}
/*
      if((data.id == this.singlePost._id) && (this.singlePost.isUpvoted === true)) {
        //this.singlePost.upvotes = this.singlePost.upvotes - 1;
        this.singlePost.isUpvoted = false;
      } else {
        if((data.id == this.singlePost._id) && (this.singlePost.isUpvoted != true)) {
          //this.singlePost.upvotes = this.singlePost.upvotes + 1;
          this.singlePost.isUpvoted = true;
        }
      }
  */ 
  if(this.userCompleteData.upvotedP != null) {
  for(var i = 0; i < this.userCompleteData.upvotedC.length; i++) {
      for(var j = 0; j < this.singlePost.comments.length; j++) {
      if(this.userCompleteData.upvotedC[i] == this.singlePost.comments[j]._id) {
        this.singlePost.comments[j].isUpvoted = true;
      }
    }
    } 
  }
    console.log(this.userCompleteData);
    console.log(this.singlePost);
    this.emitChange();
  }

  handleGetPostsError(error) { 
    this.emitChange(error);
  }

  handleGetNestedComments() {
    this.emitChange();
  }

  handleGetNestedCommentsSuccess(data) {
    this.nestedComments = data;
    this.emitChange();
  }

  handleGetNestedCommentsError(error) {
    this.emitChange(error);
  }

  handleUpvote() {
    this.emitChange();
  }

  handleUpvoteSuccess(id) {
    //console.log(id);
    for(var i = 0; i < this.posts.length; i++) {
      if((this.posts[i]._id == id) && (this.posts[i].isUpvoted === true)) {
        //console.log("Trying to unvote");
        this.posts[i].upvotes = this.posts[i].upvotes - 1;
        this.posts[i].isUpvoted = false;
      }
      else {
      if((this.posts[i]._id == id) && (this.posts[i].isUpvoted != true)) {
        //console.log("Trying to vote");
        this.posts[i].upvotes = this.posts[i].upvotes + 1;
        this.posts[i].isUpvoted = true;
      }
    }
  }

  for(var i = 0; i < this.userCompleteData.posts.length; i++) {
      if((this.userCompleteData.posts[i]._id == id) && (this.userCompleteData.posts[i].isUpvoted === true)) {
        //console.log("Trying to unvote");
        this.userCompleteData.posts[i].upvotes = this.userCompleteData.posts[i].upvotes - 1;
        this.userCompleteData.posts[i].isUpvoted = false;
      }
      else {
      if((this.userCompleteData.posts[i]._id == id) && (this.userCompleteData.posts[i].isUpvoted != true)) {
        //console.log("Trying to vote");
        this.userCompleteData.posts[i].upvotes = this.userCompleteData.posts[i].upvotes + 1;
        this.userCompleteData.posts[i].isUpvoted = true;
      }
    }
  }

  if((id == this.singlePost._id) && (this.singlePost.isUpvoted === true)) {
        this.singlePost.upvotes = this.singlePost.upvotes - 1;
        this.singlePost.isUpvoted = false;
      } else {
        if((id == this.singlePost._id) && (this.singlePost.isUpvoted != true)) {
          this.singlePost.upvotes = this.singlePost.upvotes + 1;
          this.singlePost.isUpvoted = true;
        }
      }
    this.userPosts = this.userCompleteData.posts;
    this.postComments = this.userCompleteData.comments;
    //console.log(this.posts);
    console.log(this.singlePost);
    this.emitChange();
  }

  handleUpvoteError(error) {
    this.emitChange();
  }

  handleDownvote() {
    this.emitChange();
  }

  handleDownvoteSuccess(id) {
    this.emitChange();
  }

  handleDownvoteError() {
    this.emitChange();
  }

  handleEditPost() {
    this.emitChange();
  }

  handleEditPostSuccess(data) {
    let id = data.id;

    for(let i = 0; i < this.userPosts.length; i++) {
      if(id == this.userPosts[i]._id) {
        this.userPosts[i].title = data.title;
        this.userPosts[i].body = data.body;
        this.userPosts[i].thumbnail = data.thumbnail;
      }
    }

    if(this.posts.length != undefined){
    for(let i = 0; i < this.posts.length; i++) {
      if(id == this.posts[i]._id) {
        this.posts[i].title = data.title;
        this.posts[i].body = data.body;
        this.posts[i].thumbnail = data.thumbnail;
      }
    }
  }
    this.emitChange();
  }

  handleEditPostError() {
    this.emitChange();
  }

  handleEditComment() {
    this.emitChange();
  }

  handleEditCommentSuccess(data) {
    let id = data.id;

    for(let i = 0; i < this.postComments.length; i++) {
      if(id == this.postComments[i]._id) {
        this.postComments[i].body = data.body;
      }
    }
    if(this.singlePost.comments != undefined) {
    for(let i = 0; i < this.singlePost.comments.length; i++) {
      if(id == this.singlePost.comments[i]._id) {
        this.singlePost.comments[i].body = data.body;
      }
    }
  }
    this.emitChange();
  }

  handleEditCommentError() {
    this.emitChange();
  }
  
  handleDeleteComment() {
    this.emitChange();
  }

  handleDeleteCommentSuccess(id) {

    for(let i = 0; i < this.postComments.length; i++) {
      if(id == this.postComments[i]._id){
        this.postComments.splice(i, 1);
      }
    }

     if(this.singlePost.comments != undefined) {
    for(let i = 0; i < this.singlePost.comments.length; i++) {
      if(id == this.singlePost.comments[i]._id) {
        this.singlePost.comments.splice(i, 1);
      }
    }
  }
    this.emitChange();
  }

  handleDeleteCommentError() {
    this.emitChange();
  }
  handleAddNestedComment() {
    this.emitChange();
  }

  handleAddNestedCommentSuccess(data) {
    this.emitChange();
  }

  handleAddNestedCommentError() {
    this.emitChange();
  }

  handleRemovePost() {
    this.emitChange();
  }

  handleRemovePostSuccess(id) {

    for(let i = 0; i < this.userPosts.length; i++) {
      if(id == this.userPosts[i]._id) {
        this.userPosts.splice(i, 1);
      }
    }

    if(this.posts.length != undefined) {
    for(let i = 0; i < this.posts.length; i++) {
      if(id == this.posts[i]._id) {
        this.posts.splice(i, 1);
      }
    }
  }

    this.emitChange();
  }

  handleRemovePostError() {
    this.emitChange();
  }

  handleUpdateViewCount() {
    this.emitChange();
  }

  handleUpdateViewCountSuccess() {
    this.emitChange();
  }

  handleUpdateViewCountError() {
    this.emitChange();
  }
  
  handleGetCompleteProfile() {
    this.emitChange();
  }

  handleGetCompleteProfileSuccess(data) {
    this.userCompleteData = data;

    
    for(let i = 0; i< this.posts.length; i++){
      for(let j = 0; j < this.userCompleteData.upvotedP.length; j++) {
        if(this.posts[i]._id == this.userCompleteData.upvotedP[j]) {
          this.posts[i].isUpvoted = true;
        }
      }
    }

    if(this.userCompleteData.upvotedP != undefined) {
    for(let x = 0; x < this.userCompleteData.upvotedP.length; x++) {
      for(let y = 0; y< this.userCompleteData.posts.length; y++) {
        if(this.userCompleteData.upvotedP[x] == this.userCompleteData.posts[y]._id) {
          this.userCompleteData.posts[y].isUpvoted = true;
        }
      }
    }
  }
    for(var i = 0; i < this.userCompleteData.upvotedP.length; i++) {
      if(this.userCompleteData.upvotedP[i] == this.singlePost._id) {
        //console.log("Trying to unvote");
        //this.userCompleteData.posts[i].upvotes = this.userCompleteData.posts[i].upvotes - 1;
        //this.userCompleteData.posts[i].isUpvoted = false;
        this.singlePost.isUpvoted = true;
      }
      else {
      if(this.userCompleteData.upvotedP[i] == this.singlePost._id) {
        //console.log("Trying to vote");
        //this.userCompleteData.posts[i].upvotes = this.userCompleteData.posts[i].upvotes + 1;
        this.singlePost.isUpvoted = false;
        //this.userCompleteData.posts[i].isUpvoted = true;
      }
    }
  }

  let length = 0;

  if(this.singlePost.length == 0) {
    length = 0;
  } 
  if(this.singlePost.comments != undefined){
    length = this.singlePost.comments.length; 
  }
  

  for(var i = 0; i < this.userCompleteData.upvotedC.length; i++) {
      for(var j = 0; j < length; j++) {
      if(this.userCompleteData.upvotedC[i] == this.singlePost.comments[j]._id) {
        this.singlePost.comments[j].isUpvoted = true;
      }
    }
    }

    this.userPosts = this.userCompleteData.posts;
    this.postComments = this.userCompleteData.comments;
    //console.log(this.userCompleteData.posts);
    //console.log(this.userCompleteData.upvotedP);
    this.emitChange();
  }

  handleGetCompleteProfileError(error){
    this.emitChange(error);
  }

  handleUpvoteComment() {
    this.emitChange();
  }

  handleUpvoteCommentSuccess(commentid) {
    this.emitChange();
  }

  handleUpvoteCommentError() {
    this.emitChange();
  }


}

// Export our newly created Store
export default alt.createStore(PostsStore, 'PostsStore');
