import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */

  allPosts: () => {
    return $.ajax({
      url:'/allPosts',
      type: 'GET'
    });
  },

  getPosts: (id) => {
    return $.ajax({
      url:'/posts/' + id + '/getPost',
      type: 'GET'
    });
  },

  getNestedComments: (id) => {
      return $.ajax({
      url:'/posts/' + id + '/getPost/comments',
      type: 'GET'
    });
  },


 getCompleteProfile: () => {
    return $.ajax({
      url: '/getCompleteProfile',
      type: 'GET'
    });
  },

   upvoteComment: (commentid) => {
    return $.ajax({
      url:'/comments/' +commentid+ '/upvote',
      type: 'PUT'
    });
  },

  upvotePost: (id) => {
    return $.ajax({
      url: '/posts/'+ id + '/upvote',
      type: 'PUT'
      //contentType: 'application/json',
      //data: JSON.stringify(data)
    });
  },


  downvotePost: (id, data) => {
    return $.ajax({
      url: '/posts/'+ id + '/downvote',
      type: 'PUT'
      //contentType: 'application/json',
      //data: JSON.stringify(data)
    });
  },

  editPost: (uid, pid, data) => {
    return $.ajax({
      url: '/edit/'+ uid+ '/' + pid,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  
  },

  addNestedComment: (id, data) => {
    return $.ajax({
      url: '/posts/' + id,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  removePost: (uid, pid, data) => {
    return $.ajax({
      url: '/posts/delete/' + uid+ '/' + pid,
      type: 'PUT'
      //contentType: 'application/json',
      //data: JSON.stringify(data)
    });

  },

  updateViewCount: (pid) => {
    return $.ajax({
      url: '/posts/' + pid + '/updateViewCount',
      type: 'PUT',
      //contentType: 'application/json',
      //data: JSON.stringify(data)
    });

  }


};

export default utils;
