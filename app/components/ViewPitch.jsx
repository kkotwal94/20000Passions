import React from 'react';
import {PropTypes,Link} from 'react-router';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import CommentsActions from 'actions/CommentsActions';
import CommentsStore from 'stores/CommentsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import facebook from 'images/facebook.png';
import twitter from 'images/twitter.png';
import YouTube from 'react-youtube';
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
    this.state.postId = 'waiting';
    this.state.videoId = 0;
    this.state.player = null;
	}

  _onReady = (event) => {
    console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`); // eslint-disable-line
    this.setState({
      player: event.target,
    });
  }

  _onPlayVideo = () => {
    this.state.player.playVideo();
  }

  _onPauseVideo = () => {
    this.state.player.pauseVideo();
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
        let user = UserStore.getState().user.get('authenticated');
        this.setState({postId: valId});

        PostsActions.getPosts(valId);
        
        PostsActions.getCompleteProfile();
      
        PostsActions.updateViewCount(valId);
        
        UserActions.getProfile();
      
        window.fbAsyncInit = function() {
        FB.init({
          appId      : '255704301435296',
          xfbml      : true,
          version    : 'v2.5'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

      var scriptNode = document.getElementById('twitter-wjs')
        if (scriptNode) {
          scriptNode.parentNode.removeChild(scriptNode)
        }

      window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));

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

  _shareFacebook = (image, description) => {
    console.log(window.location.href);
    FB.ui({
    method: 'feed',
    link: window.location.href,
    description: description,
    picture: image
}, function(response){});
  
  }

  _onSubmitComment = () => {
    let user = UserStore.getState().user.get('authenticated');
    if(user) {
    let singleposts = this.state.singleposts;
    let singleposts2 =  {author: '',
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
        type: ""};
    singleposts2 = this.state.singleposts;
    let thumbnail = singleposts2.thumbnail;
    let description = singleposts2.body;
    let body = this.refs.body.getValue(); 
    let pid = this.state.postId;
    let data = {
      body: body
    };

    let userid = UserStore.getState().user.get('id');
    let userFirstname = UserStore.getState().user.get('data').get('firstName');

    let info = {
      body: body,
      author: userFirstname,
      upvotes: 1,
      isUpvoted: true,
      owner: userid
    };

    singleposts.comments.push(info);
    CommentsActions.createComment(pid, data);
   } else {
    alert("User must be logged in to comment");
   }
  }

  render() {
    //let pid = this.state.postId;
    let user = UserStore.getState().user.get('authenticated');

     const opts = {
      height: '90%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    //console.log(user);
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
        type: ""
    }

    let commentsList = [];

    let commentView = (
      <div></div>
      );
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

    let shareBar = (
          <div style={{width: '30%'}}>
          <Paper zDepth={2}>
          <span>Share on  </span><img src={facebook} onClick={() => {this._shareFacebook(this.state.singleposts.thumbnail, this.state.singleposts.description)}}/> <img src={twitter}/>
          </Paper>
          </div>

          );

    let description = (
      <div></div>
      );

    let commentBar = (
      <Paper zDepth={2}>
            <TextField
            ref = "body"
        hintText="Enter a comment here, this is a multiline text box input, 3 rows and your comment will be inputted"
        multiLine={true}
        rows={3}
        rowsMax={4}
        style={{width: '75%'}}/>
        <RaisedButton label="Submit Comment" primary={true} onTouchTap={this._onSubmitComment}/>
        </Paper>
      );

    if(this.state.singleposts != undefined) {
        //console.log("In if statement");
        singleposts = this.state.singleposts;
        let type = this.state.singleposts.type;
        //console.log(type);
        commentsList = singleposts.comments;
        //console.log(commentsList); 
        console.log(singleposts);
        commentView = commentsList.map((comment, key) =>
          <div id= {"comment"+ key} className={styles.row + ' ' + styles.row__group} key={key}>
          <div className = {styles.col + ' ' + styles.col__col212}>
          </div>
          <div className = {styles.col + ' ' + styles.col__col612}>
          <Card>
          <CardHeader
            title={comment.author}
            subtitle={'Comment'}/>
            <CardText>
            {comment.body}
            </CardText>
            <CardActions>
            <FlatButton id={"likeComment"+key} label="Like" 
            style={(() => { 
                if(comment.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            )()}

            onTouchTap= {function() {
              if(user == false){
                alert("User must be logged in to like a comment");

              }
              else {
              PostsActions.upvoteComment(comment._id);
              console.log("Upvoting..");
              let likeButton = document.getElementById('likeComment'+key); 
              let likeNumber = document.getElementById('likeNumber'+key); 
              //console.log(singleposts.isUpvoted);
              if(comment.isUpvoted) { 
                console.log("Trying to update color to black?");
                likeButton.style.color = "black"; 
                comment.upvotes = comment.upvotes - 1;
                likeNumber.innerHTML = comment.upvotes;

                comment.isUpvoted = false; 
                likeNumber.style.color ="black";
              } else { 
                console.log("Trying to update color back to green");
                likeButton.style.color = "green"; 
                comment.upvotes = comment.upvotes + 1;
                likeNumber.innerHTML = comment.upvotes;
                
                comment.isUpvoted = true; 
                likeNumber.style.color = "green";}
                }           
            }}/>


            <span id={"likeNumber" + key}style={(() => { 
              if(user){
                if(comment.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }}
            )()}>{comment.upvotes}</span>
            <Link to={'/user/' + comment.owner}><FlatButton id={"userProfile"+key} label="View Profile"/></Link>
            </CardActions>
            </Card>
            </div>
          </div>
          );

        if(type == "upload" || "") {
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
      }

      if(type == "youtube") {
        videoContent = (
          <Paper  style={{backgroundColor: '#333'}} zDepth={2}>
            <div style ={{height:'600px'}}>
                    <h1 className={styles.about__header} style={{textAlign: "center"}}> {singleposts.title}</h1>
          
        <YouTube videoId={singleposts.youtubeURL} onReady={this._onReady} opts = {opts} />
        </div>
        </Paper>
          );
      }

      if(type == "text") {
        videoContent = (
          <Paper  style={{backgroundColor: '#333'}} zDepth={2}>
            <div style ={{height:'600px'}}>
                    <h1 className={styles.about__header} style={{textAlign: "center"}}> {singleposts.title}</h1>
          
        <img style ={{height:'100%', width: '100%'}}src={singleposts.thumbnail} >
            
        </img>
        </div>
        </Paper>
          );
      }

      description = (
      <div style={{width: '100%'}}>
      <Card style={{backgroundColor: 'white'}}>
      <CardHeader
        title={singleposts.title}
        subtitle={singleposts.author}/>
      <CardText>
      {singleposts.body}
      </CardText>
      <CardActions>
      <Link to={'/user/' + singleposts.owner}><FlatButton label="View Profile"/></Link>
      <FlatButton id ="likeButton" style={(() => {
              if(user){ 
                if(singleposts.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            }
            )()} label="Like" onTouchTap={function() { 
              if(user == false) {
                alert("User must be logged in to like the post!");
              } else {
              PostsActions.upvotePost(singleposts._id); 
              let likeButton = document.getElementById('likeButton'); 
              let likeNumber = document.getElementById('likeNumber'); 
              //console.log(singleposts.isUpvoted);
              if(singleposts.isUpvoted) { 
                console.log("Trying to update color to black?");
                likeButton.style.color = "black"; 
                likeNumber.innerHTML = singleposts.upvotes - 1; 
                likeNumber.style.color ="black";
              } else { 
                console.log("Trying to update color back to green");
                likeButton.style.color = "green"; 
                likeNumber.innerHTML = singleposts.upvotes + 1; 
                likeNumber.style.color = "green";}} }}/>
              
              
              <span id = "likeNumber" style={(() => { 
                if(user){
                if(singleposts.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }}
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
          {shareBar}
          </div>
        
        </div>

        <div className = {styles.row + ' ' + styles.row__group}>
        <div className = {styles.col + ' ' + styles.col__col212}>
          </div>
          <div className = {styles.col + ' ' + styles.col__col612}>
            {description}
          </div>
        </div>

         <div className = {styles.row + ' ' + styles.row__group}>
        <div className = {styles.col + ' ' + styles.col__col212}>
          </div>
          <div className = {styles.col + ' ' + styles.col__col612}>
            {commentBar}
          </div>
        </div>
        <div className = {styles.row + ' ' + styles.row__group}>
          {commentView}
        </div>
        </div>
    );
  }
}

//856 x 480 is a good resolution