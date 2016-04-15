import React from 'react';
import Link from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import FullWidthSection from 'components/FullWidthSection';
import LoginSignupPage from 'components/LoginSignupPage';
import io from 'socket.io-client';
import styles from 'scss/components/_chat.scss';
import MobileTearSheet from 'components/MobileTearSheet';
import $ from 'jquery';
const { AppBar,
      AppCanvas,
       Avatar,
      FontIcon,
      Dialog,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      Divider,
      ListItem,
      List,
      RaisedButton,
      Styles,
      Tab,
      TextField,
      Tabs,
      Paper} = require('material-ui');

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;
import {PropTypes} from 'react-router';
import chromecon from 'images/chrome.png';
const isBrowser = typeof window !== 'undefined';
const MyWindowDependentLibrary = isBrowser ? require( 'scss/components/homevid.css') : undefined;
import video from 'video/Dancing-Bulbs.mp4';
import videom from 'video/Dancing-Bulbs.webm';
import videoimg from 'video/Dancing-Bulbs.jpg';
let socket = io('http://localhost:3000');
export default class Dashboard extends React.Component {

  

  constructor(props) {
  	super(props);
	  this.state = UserStore.getState();
    this.state.open = false;
    this.state.chat = [];
    console.log(socket);
    socket.on('news', function(data) {
        console.log(data);
    });
  }


handleDialogOpen = () => {
    this.setState({open: true});
    //alert("hellow world");
  }
  

  handleDialogClose = () => {
    this.setState({open: false});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //our message we entered
    if(!this.state.user.get('authenticated')) {
      this.setState({open: true});
    }

    else {
      let newMessage;
      if(this.state.user.get('data') === undefined) {
        newMessage =this.state.user.get('profile').get('firstName') + " " + this.state.user.get('profile').get('lastName')+ ": " + this.refs.chatInput.getValue();
      }
      else {
        newMessage =this.state.user.get('data').get('firstName') + " " + this.state.user.get('data').get('lastName')+ ": " + this.refs.chatInput.getValue();
      }
    //old chat list
    socket.emit('chat message', newMessage);
    let prevChat = this.state.chat;
    prevChat.push(newMessage);
    this.refs.chatInput.setValue('');
    this.setState({
      chat: prevChat
    });
    $('#chat').animate({
        scrollTop: $('#chat')[0].scrollHeight});

    return false; 
    }
  }

 static contextTypes = {
        router: React.PropTypes.func
    }

  componentDidMount() {
    UserStore.listen(this._onChange);
    console.log(this.state.chat);
    socket.on('chat message', (msg) => {
      let chat = this.state.chat;
      chat.push(msg);
      console.log(msg);
      this.setState({chat: chat});
      $('#chat').animate({
        scrollTop: $('#chat')[0].scrollHeight});
    });
    if(this.state.user.get('authenticated')) {
      if(this.state.user.get('data') === undefined) {
        socket.emit('adduser', this.state.user.get('profile').get('firstName') + " " + this.state.user.get('profile').get('lastName'));
      }
      else {
      socket.emit('adduser', this.state.user.get('data').get('firstName') + " " + this.state.user.get('data').get('lastName'));
      }
    }
    //let socket = io();
    //console.log(socket);
    //jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    //console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
  }

   componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

   _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }
  
  componentWillReceiveProps(nextProps, nextContext) {

  }

  _createPitch = () => {
    this.context.history.pushState(null, '/pitch');
  }

  _ATransition = () => {
    this.context.history.pushState(null, '/about');
  }

  _GTransition = () => {
    this.context.history.pushState(null, '/gallery');
  }

  _openDialog = () => {
      console.log(this.refs.nav);
      this.refs.nav.handleDialogOpen;
    }

   getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      },
      github: {
        position: 'fixed',
        right: Spacing.desktopGutter / 2,
        top: 8,
        zIndex: 5,
        color: 'white',
      },
      iconButton: {
        color: darkWhite,
      },
    };
  }


   _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },

      a: {
        color: '#ff4081'
      }
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose">
        Navigate through with our tabs to see the &nbsp;
        <a style = {styles.a} onClick={this._GTransition}>Gallery</a> &nbsp; 
        or make your own pitch by registering.
        You can also see tips and what we are about at the &nbsp;
        <a  style= {styles.a} onClick={this._ATransition}>About</a> tab aswell.
        
      </FullWidthSection>
    );
  }

  _getChatBox() {
     let styles = {
      root: {
        backgroundColor: Colors.lightBlue900,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        height: '100px',
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      }
  };
  let chatMessages = this.state.chat;
  return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="chatboxs">
        <strong>Chat at our chatbox HERE!</strong>
        <Paper
          zDepth={2}
          className="chat"
          id ="chat"
          style={{width:"50%", margin: "0 auto", height: "400px", overflow: "scroll"}}
          >
          <ul style={{listStyleType: 'none', margin:"0", padding: "0", wordWrap : "break-word"}}>
          {chatMessages.map((message) =>
            <li>{message}</li>
            )}
          </ul>
          </Paper>

          <form ref="form" onSubmit={this.handleSubmit} style={{margin: "0 auto", textAlign: 'center' }}>
            <TextField
            style={{margin: "0 auto", width:"50%"}}
             hintText="Start chatting by typing in here, make sure you are logged in!"
             ref="chatInput"
              />
          </form>
                  
      </FullWidthSection>
    );
  }


  render() {
    console.log(this.state.user);
    let style = {
      root: {
        //backgroundColor: '#01579b',
        zIndex: 1,
        width: '100%',
        position: 'absolute',
        //marginTop: '-3px',
        color: Colors.darkWhite,
        textAlign: 'center'
      },
       svgLogo: {
        width: 200,
        height: 200,  
        textAlign: 'center',
      }
    };


let dialogStyle = {

  root: {
    width: '100%'
  },

  mainDialog: {
    backgroundColor: "#2f2f2f"
  }

};

    let styles = this.getStyles();

    let renderedResult;

    if(this.state.user.get('authenticated')) {
      renderedResult = (
        <div style={{backgroundColor: "#01579b"}}>

        <div className="homepage-hero-module">
 <div className="video-container">
        <div className="filter"></div>
        <div className="intro" style={style.root}>
        <img style={style.svgLogo} src={chromecon}></img>
        <h1>20,000 Pitches</h1>
        <h1>Get started right away by creating your own pitch!</h1>

        <RaisedButton
          label="Create Pitch"
          primary={true}
          linkButton={false}
          onTouchTap={this._createPitch}
          />
</div>
        <video preload="auto" autoPlay loop="loop" className="fillWidth" src={video}>
        <source/>
        </video>
</div>
</div>


        {this._getHomePurpose()}
        
        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Programmed and Developed by Karan Kotwal based of Material Design(Material-UI)
            <br/>
            <a style={styles.a} href="http://kkotwal.me">Karan Kotwal</a> 
          </p>
          
        </FullWidthSection>
        
        </div>
        );
    }

    else {
      renderedResult = (
        <div>
        <div className="homepage-hero-module">
    <div className="video-container">
        <div className="filter"></div>
        <div className="intro" style={style.root}>
        <img style={style.svgLogo} src={chromecon}></img>
        <h2>20,000 Pitches</h2>
        <h2>Have a idea boiling in your head?</h2>
        <h2>Do you want to tell someone else about it?</h2>
        <h2>Then register and give your own pitch by uploading a 30 second video describing your idea!</h2>

        <RaisedButton
          label="Register"
          primary={true}
          linkButton={false}
          onTouchTap={this.handleDialogOpen}/>
          </div>
        <video preload="auto" autoPlay loop="loop" className="fillWidth" src={video}>
        <source/>
        </video>
        
    </div>
</div>
        <Paper zDepth={1}
             rounded={false}
             style={style.root}
        >
         
        

        </Paper>


        {this._getHomePurpose()}
        
        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Programmed and Developed by Karan Kotwal based of Material Design(Material-UI)
            <br/>
            <a style={styles.a} href="http://kkotwal.me">Karan Kotwal</a> 
          </p>
          
        </FullWidthSection>
        
        </div>
        );
    }

    return (
        <div>
        {renderedResult}
        <Dialog
          
          
          bodyStyle={dialogStyle.mainDialog}
          contentStyle={dialogStyle.root}
          modal={false}
          onRequestClose={this.handleDialogClose}
          open={this.state.open}>
          <LoginSignupPage />
        </Dialog>
        </div>
    );
  }

}

Dashboard.contextTypes = { history: PropTypes.history };
Dashboard.propTypes = { UserStore: React.PropTypes.object };