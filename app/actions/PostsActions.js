import alt from 'altInstance';
import PostsWebAPIUtils from 'utils/PostsWebAPIUtils';
import CommentsWebAPIUtils from 'utils/CommentsWebAPIUtils';
/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class PostsActions {

	allPosts() {
	this.dispatch();
	PostsWebAPIUtils.allPosts().done((data) => {
      this.actions.allPostsSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.allPostsError(errorMessage);
    });
  }

  allPostsSuccess(data) {
  	this.dispatch(data);
    this.actions.getCompleteProfile();
  }

  allPostsError(error) {
  	this.dispatch(error);
  }

  getPosts(id) {
  	this.dispatch();
	PostsWebAPIUtils.getPosts(id).done((data) => {
      this.actions.getPostsSuccess(data, id);
    })
    .fail((errorMessage) => {
      this.actions.getPostsError(errorMessage);
    });
  }

  getPostsSuccess(data, id) {
    let dataObj = {posts: data, id: id};
  	this.dispatch(dataObj);

  }

  getPostsError(error){
  	this.dispatch(error);
  }

  getNestedComments(id) {
  	this.dispatch();
  	PostsWebAPIUtils.getNestedComments(id).done((data) => {
      this.actions.getNestedCommentsSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.getNestedCommentsError(errorMessage);
    });
  }

  getNestedCommentsSuccess(data) {
  	this.dispatch(data);
  }

  getNestedCommentsError(error) {
  	this.dispatch(error);
  }

  getCompleteProfile() {
    this.dispatch();
    PostsWebAPIUtils.getCompleteProfile().done((data) =>{
      this.actions.getCompleteProfileSuccess(data);
    })
     .fail((errorMessage) => {
        this.actions.getCompleteProfileError(errorMessage);
     });
  }

  getCompleteProfileError(errorMessage) {
    this.dispatch(errorMessage);
  }

  getCompleteProfileSuccess(data) {
    this.dispatch(data);
  }

  updateViewCount(pid) {
    this.dispatch();
    PostsWebAPIUtils.updateViewCount(pid)
      .then((response, textStatus) => {
        if(textStatus === 'success'){
          this.actions.updateViewCountSuccess(pid);
        }
        if(textStatus === "error") {
          this.actions.updateViewCountError();
        }
      });
  }

  updateViewCountSuccess() {
    this.dispatch();
  }

  updateViewCountError() {
    this.dispatch();
  }

  upvotePost(id) {
  	this.dispatch();
  	PostsWebAPIUtils.upvotePost(id)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.upvotePostSuccess(id);
        }
        if(textStatus === 'error') {
          this.actions.upvotePostError();
        }
      });
  }

  upvotePostSuccess(id) {
  	this.dispatch(id);
  }

  upvotePostError() { 
  	this.dispatch();
  }

  downvotePost(id) {
  	this.dispatch();
  	PostsWebAPIUtils.downvotePost(id)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.downvotePostSuccess(id);
        }
        if(textStatus === 'error') {
          this.actions.downvotePostError();
        }
      });
  }

  downvotePostSuccess(id) {
  	this.dispatch(id);
  }

  downvotePostError(){
  	this.dispatch();
  }

  editPost(id, pid, data) {
  	this.dispatch();
  	PostsWebAPIUtils.editPost(id, pid, data)
  		.then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.editPostSuccess(data);
        }
        if(textStatus === 'error') {
          this.actions.editPostError();
        }
      });
  }

  editPostSuccess(data) {
  	this.dispatch(data);
  }

  editPostError() {
  	this.dispatch();
  }

  editComment(userid, postid, data) {
    this.dispatch();
    CommentsWebAPIUtils.editComment(userid, postid, data)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.editCommentSuccess(data);
        }
        if(textStatus === 'error') {
          this.actions.editCommentError();
        }
      });
  }

  editCommentSuccess(data) {
    this.dispatch(data);
  }

  editCommentError() {
    this.dispatch();
  }

  addNestedComment(id, data) {
  	this.dispatch();
  	PostsWebAPIUtils.addNestedComment(id, data)
  		.then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.addNestedCommentSuccess(id);
        }
        if(textStatus === 'error') {
          this.actions.addNestedCommentError();
        }
      });
  }	

  addNestedCommentSuccess(id, data) {
  	this.dispatch(data);
  }

  addNestedCommentError(){
  	this.dispatch();
  }

   removePost(uid, pid) {
  	this.dispatch();
  	PostsWebAPIUtils.removePost(uid, pid)
  		.then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.removePostSuccess(uid, pid);
        }
        if(textStatus === 'error') {
          this.actions.removePostError();
        }
      });
  }	

  removePostSuccess(uid, pid) {
  	this.dispatch();
  }

  removePostError() {
  	this.dispatch();
  }

  upvoteComment(commentid) {
    this.dispatch();
    PostsWebAPIUtils.upvoteComment(commentid)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.upvoteCommentSuccess(commentid);
        }
        if(textStatus === 'error') {
          this.actions.upvoteCommentError();
        }
      });
  }

  upvoteCommentSuccess(commentid) {
    this.dispatch(commentid);
  }

  upvoteCommentError() {
    this.dispatch();
  }
}

export default alt.createActions(PostsActions);
