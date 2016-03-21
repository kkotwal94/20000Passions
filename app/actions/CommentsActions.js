import alt from 'altInstance';
import CommentsWebAPIUtils from 'utils/CommentsWebAPIUtils';

/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class CommentsActions {

  getComment(id) {
	this.dispatch();
	CommentsWebAPIUtils.getComment(id).done((data) => {
      this.actions.getCommentSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.getCommentError(errorMessage);
    });
  }

  getCommentSuccess(data) {
  	this.dispatch(data);
  }

  getCommentError(error) {
  	this.dispatch(error);
  }

  createComment(postid, data) {
  	this.dispatch();
  	CommentsWebAPIUtils.createComment(postid, data)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.createCommentSuccess(postid, data);
        }
        if(textStatus === 'error') {
          this.actions.createCommentError();
        }
      });
  }

  createCommentSuccess(postid, data) {
  	this.dispatch(data);
  }

  createCommentError() {
  	this.dispatch();
  }


  editComment(userid, postid, data) {
  	this.dispatch();
  	CommentsWebAPIUtils.editComment(userid, postid, data)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.editCommentSuccess(userid, postid, data);
        }
        if(textStatus === 'error') {
          this.actions.editCommentError();
        }
      });
  }

  editCommentSuccess(userid, postid, data) {
  	this.dispatch(data);
  }

  editCommentError() {
  	this.dispatch();
  }

  upvoteComment(commentid) {
  	this.dispatch();
  	CommentsWebAPIUtils.upvoteComment(commentid)
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

  downvoteComment(commentid) {
  	this.dispatch();
  	CommentsWebAPIUtils.downvoteComment(commentid)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.downvoteCommentSuccess(commentid);
        }
        if(textStatus === 'error') {
          this.actions.downvoteCommentError();
        }
      });
  }

  downvoteCommentSuccess(commentid) {
  	this.dispatch(commentid);
  }

  downvoteCommentError() {
  	this.dispatch();
  }

 deleteComment(userid, postid, commentid) {
  	this.dispatch();
  	CommentsWebAPIUtils.deleteComment(userid, postid, commentid)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.deleteCommentSuccess(userid, postid, commentid);
        }
        if(textStatus === 'error') {
          this.actions.deleteCommentError();
        }
      });
  }

  deleteCommentSuccess(userid, postid, data) {
  	this.dispatch();
  }

  deleteCommentError() {
  	this.dispatch();
  }

}

export default alt.createActions(CommentsActions);
