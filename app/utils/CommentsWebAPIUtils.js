import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */

  getComment: (id) => {
    return $.ajax({
      url:'/comment/' + id + '/getComment',
      type: 'GET'
    });
  },

  createComment: (postid, data) => {
    return $.ajax({
      url: '/submit/' + postid +'/comments',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  editComment: (userid, commentid, data) => {
    return $.ajax({
      url: '/editC/' + userid + '/' +commentid,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  upvoteComment: (commentid) => {
    return $.ajax({
      url:'/comments/' +commentid+ '/upvote',
      type: 'PUT'
    });
  },

  downvoteComment: (commentid) => {
    return $.ajax({
      url:'/comments/' +commentid+ '/downvote',
      type: 'PUT'
    });
  },

  deleteComment: (userid, postid, commentid) => {
    return $.ajax({
      url:'/post/' + postid + '/comment/delete/' + userid+ '/' + commentid,
      type: 'PUT'
    });
  }


};

export default utils;
