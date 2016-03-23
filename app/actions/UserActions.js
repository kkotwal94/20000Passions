import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import PostsActions from 'actions/PostsActions';
/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class UserActions {

  manuallogin(data) {
    this.dispatch();
    UserWebAPIUtils.manuallogin(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.loginsuccess(data.email);
        }
       if(textStatus === 'error'){
        // Dispatch another event for a bad login
        this.actions.loginerror();
      }
      });
  }

  loginsuccess(email) {
    this.dispatch(email);
    this.actions.getProfile();
    PostsActions.getCompleteProfile();
  }

  loginerror(){
    this.dispatch();
  }

  // Leaving this here for future use
  register(data) {
    this.dispatch();
    UserWebAPIUtils.register(data)
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          this.actions.registerSuccess(data);
        }
      if (textStatus === 'error')  {
          this.actions.registerError(data);
        }
      });
  }

  registerSuccess(data) {
    this.dispatch(data);
  }

  registerError(){
    this.dispatch();
  }

  updateProfile(data) {
    this.dispatch();
    UserWebAPIUtils.updateProfile(data)
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.profileUpdateSuccess(data);
        }
        if(textStatus === 'error') {
          this.actions.profileUpdateError(data);
        }
      });
  }

  profileUpdateSuccess(data) {
    this.dispatch(data);
  }

  profileUpdateError(error) {
    this.dispatch(error);
  }

  getProfile(){
    this.dispatch();
    UserWebAPIUtils.getProfile().done((data) => {
      this.actions.getProfileSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.getProfileError(errorMessage);
    });
  }

  getProfileSuccess(data) {
    this.dispatch(data);
  }

  getProfileError(errorMessage) {
    this.dispatch(errorMessage);
  }

  logout() {
    this.dispatch();
    UserWebAPIUtils.logout()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.logoutsuccess();
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  logoutsuccess() {
    this.dispatch();
  }
}

export default alt.createActions(UserActions);
