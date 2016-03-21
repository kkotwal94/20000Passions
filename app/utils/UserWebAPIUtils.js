import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  manuallogin: (data) => {
    return $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  /*
   * @return {Promise}
   */
  logout: () => {
    return $.ajax({
      url: '/logout',
      type: 'GET'
    });
  },

  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  register: (data) => {
    return $.ajax({
      url: '/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  getProfile: () => {
    return $.ajax({
      url:'/getProfile',
      type: 'GET'
    });
  },

  updateProfile: (data) => {
    return $.ajax({
      url: '/updateProfile',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
