import React from 'react';
import {PropTypes,Link} from 'react-router';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
const { 
      Menu,
      Card,
      CardActions,
      CardHeader,
      CardMedia,
      CardTitle,
      FlatButton,
      CardText,
      Mixins,
      Divider,
      ListItem,
      List,
      IconButton,
      RaisedButton,
      Styles,  
      TextField,
      Paper,
      Snackbar } = require('material-ui');
const { Colors, Spacing, Typography } = Styles;
import styles from 'scss/components/_layout';
const isBrowser = typeof window !== 'undefined';
const MyWindowDependentLibrary = isBrowser ? require( 'scss/components/video.css') : undefined;

export default class ViewPitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = UserStore.getState();
		this.states = PostsStore.getState();
    this.state.videoId = 0;
	}


    _showVideo = (id) => {
        this.setState({
            videoId: id
        }, this.reloadVideo);
    }

    _reloadVideo = () => {
        // When changing a HTML5 video, you have to reload it.
        this.refs.video.load();
        this.refs.video.play();
    }

    _togglePlay = () => {
        this.refs.video.togglePlay();
    }

    _toggleMute = () => {
        this.refs.video.toggleMute()
    }

    _fullscreen = () => {
        this.refs.video.fullscreen();
    }

    _load = () => {
        this.refs.video.load();
    }

    _play = () => {
        this.refs.video.play();
    }

    _pause = () => {
        this.refs.video.pause();
    }

    _unmute = () => {
        this.refs.video.unmute();
    }

    _mute = () => {
        this.refs.video.mute();
    }

    _seek = () => {
        this.refs.video.seek(this._seekInput.valueAsNumber);
    }

    _setVolume = () => {
        this.refs.video.setVolume(this._volumeInput.valueAsNumber);
    }

    _onProgress = () => {
        var el = ReactDOM.findDOMNode(this.refs.video).getElementsByTagName('video')[0];
        this.setState({
            percentageLoaded: el.buffered.length && el.buffered.end(el.buffered.length - 1) / el.duration * 100
        });
    }
	componentDidMount() {
		//PostsActions.allPosts();
        let link = window.location.href;
        let linkArr = link.split('/');
        let valId = linkArr[linkArr.length-1];
        //console.log(valId);
        PostsActions.getPosts(valId);
        PostsActions.getCompleteProfile();
        
        PostsActions.updateViewCount(valId);
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
      //posts: PostsStore.getState().posts,
      posts: PostsStore.getState().userPosts,
      singleposts: PostsStore.getState().singlePost,
      nestedComments: PostsStore.getState().nestedComments
    });
  }
  render() {
    let singleposts = {
        author: '',
        body: '',
        allComments: 0,
        author: "",
        body: "",
        comments: '',
        date: "",
        owner: "",
        thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSn__rlpTc9Zwkh1yGjR0XkmnYsxx-SoW-4bjN6V-EGiI0EZ1ag",
        title: "",
        upvotes: 0,
        videoURL: "56e634d8b9f3abe814569f10",
    }
    let videoContent = (
       <div></div>
        );

    let informanic = (
        <div style={{marginTop: '8%', width: '50%'}}>
        <Paper zDepth={2} style ={{backgroundColor: 'crimson', color: 'white'}}>
        <span>Every passion/pitch is represented in a video format, remember to give critical info to the contestants or idealist as they present their ideas rather than bash them. You can like the video clicking the button below, or comment below as well. The video controls are shown up when you hover over the player.</span>

        </Paper>
        </div>
      );

    let description = (
      <div></div>
      );

    if(this.state.singleposts != undefined) {
        //console.log("In if statement");
        singleposts = this.state.singleposts;
        videoContent = (
          <Paper  style={{backgroundColor: '#333'}} zDepth={2}>
            <div style ={{height:'600px'}}>
                    <h1 className={styles.about__header} style={{textAlign: "center"}}> {singleposts.title}</h1>
          
        <Video style ={{height:'100%', width: '100%'}}poster={singleposts.thumbnail} controls ref="video" onProgress={this.onProgress}>
            <source style = {{width: '100%', height: '100%'}} src={"/file/" + singleposts.videoURL} type="video/webm" />
        </Video>
        </div>
        </Paper>
        );

      description = (
      <div style={{width: '100%'}}>
      <Card style={{backgroundColor: '#333'}}>
      <CardHeader
        title={singleposts.title}
        subtitle={singleposts.author}/>
      <CardText>
      {singleposts.body}
      </CardText>
      <CardActions>
      <Link to={'/user/' + singleposts.owner}><FlatButton label="View Profile"/></Link>
      <FlatButton id ="likeButton" style={(() => { 
                if(singleposts.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            )()} label="Like" onTouchTap={function() { PostsActions.upvotePost(singleposts._id); 
              let likeButton = document.getElementById('likeButton'); 
              let likeNumber = document.getElementById('likeNumber'); 
              console.log(singleposts.isUpvoted);
              if(singleposts.isUpvoted) { 
                console.log("Trying to update color to black?");
                likeButton.style.color = "black"; 
                likeNumber.innerHTML = singleposts.upvotes - 1; 
                likeNumber.style.color ="black";
              } else { 
                console.log("Trying to update color back to green");
                likeButton.style.color = "green"; 
                likeNumber.innerHTML = singleposts.upvotes + 1; 
                likeNumber.style.color = "green";} }}/>
              
              
              <span id = "likeNumber" style={(() => { 
                if(singleposts.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            )()}> {singleposts.upvotes}</span>
            
              
              <span style={{float:"right", marginTop: "2%"}}>{singleposts.views + " Views"}</span>
            
          
      </CardActions>
      </Card>
      </div>
      );
    }
    //console.log(this.state.singleposts);
    //console.log(singleposts);
    return (
      <div>
        <div className = {styles.row + ' ' + styles.row__group} style = {{backgroundColor: "#01579b"}}>
          <div className = {styles.col + ' ' + styles.col__col212}>
          </div>
          <div className = {styles.col + ' ' + styles.col__col612}>
            {videoContent}
          </div>
          
       

          <div className = {styles.col + ' ' + styles.col__col412}>
          {informanic}
          <br/>
          <br/>
          <br/>
          {description}
          </div>
        
        </div>
        </div>
    );
  }
}

//856 x 480 is a good resolution