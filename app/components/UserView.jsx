import React from 'react';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import { PropTypes } from 'react-router';

import styles from 'scss/components/_about';

export default class UserView extends React.Component {
	constructor(props) {
		super(props);
		this.state = UserStore.getState();
		this.states = PostsStore.getState();
	}

	componentDidMount() {
		UserStore.listen(this._onChange);
		PostsStore.listen(this._onChanges);
		
	}

	componentWillUnmount() {
		UserStore.unlisten(this._onChange);
		PostsStore.unlisten(this._onChanges);
	}


	_onChange = () => {
  	this.setState({
      user: UserStore.getState().user
    });
  }

  _onChanges = () => {
  	this.setState({
      posts: PostsStore.getState().posts,
      singleposts: PostsStore.getState().singleposts,
      nestedComments: PostsStore.getState().nestedComments
    });
  }
  render() {
  	console.log(this.state.posts);
    return (
      <div className={styles.about}>
        <h1 className={styles.about__header}>View User Page</h1>
        <p className={styles.about__description}>Indiviual user statistics</p>
      </div>
    );
  }
}
