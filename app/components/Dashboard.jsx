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


  _getTitle() {
    let styles = {
      square: {
        width: '575px',
        height: '575px',
        backgroundColor: '#ffffff',
        marginLeft: '115px',
        marginTop: '100px'
      },
      title: {
        paddingTop: '40px',
        fontSize: '100px',
        marginLeft: '35px'
      },
      divider: {
        marginTop:'50px',
        width: '100px',
        borderBottom: 'solid 4px #000000',
        marginLeft: '35px'
      },
      subtitle: {
        fontSize: '25px',
        fontWeight: Typography.fontWeightLight,
        marginTop:'50px',
        marginLeft: '35px'
      },
      buttons: {

      }
    };
    return (
      <div style={styles.square}>

        <div style={styles.title}> 20K PASSIONS</div>
        <div style={styles.divider}> </div>
        <div style={styles.subtitle}> unleash your potential. </div>

        <div style={styles.buttons}>
          <RaisedButton
           label="SHARE YOURS"
           primary={true}
           linkButton={false}
           onTouchTap={this.handleDialogOpen}
           style={{marginTop:'50px',width:'229px',height:'57px',fontSize:'18px',marginLeft:'35px',marginRight:'35px',fontWeight:Typography.fontWeightLight}}
           />
           <RaisedButton
          label="DISCOVER OTHERS"
          primary={true}
          linkButton={false}
          onTouchTap={this.handleDialogOpen}
          style={{marginTop:'50px',width:'229px',height:'57px',fontSize:'18px',fontWeight:Typography.fontWeightLight}}
          />
        </div>

      </div>
    );
  }

   _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
        paddingTop: '0px',
        paddingBottom: '0px'
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
        textAlign: 'center',
        color: Typography.textDarkBlack
      },
      divider: {
        width: '250px',
        borderBottom: 'solid 4px #0F0F0F',
        margin: '0 auto',
        paddingTop: '50px'
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
        A day dedicated to sharing and acknowledging the passions of UD.
        All  you need is an idea, a cause, or an interest that inspires you.
        <div style={styles.divider}> </div>
      </FullWidthSection>
    );
  }

  _getIntro() {
    let styles = {
      contents: {
        padding: '0px',
        paddingTop: '0px',
      },
      section: {
        backgroundColor: Colors.grey200,
        width: '80%',
        margin: '0 auto',
        padding: '0px',
        position: 'relative',
        height: '375px',
        marginBottom: '75px'
      },
      leftPassionateAbout: {
        fontWeight: Typography.fontWeightLight,
        color: Typography.textDarkBlack,
        float: 'left',
        marginTop: '-25px'
      },
      passionPhrase: {
        fontSize: '25px'
      },
      typed: {
        fontFamily: 'Ovo',
        fontSize: '45px',
      },
      rightVideo: {
        float: 'right',
      }
    };
    return (
      <div style={styles.section}
        useContent={true}
        contentStyle={styles.contents}
        contentType="p"
        className="home-intro">

        <div style={styles.leftPassionateAbout}>
          <p style={styles.passionPhrase}>I'm passionate about..</p>
          <div style={styles.typed}> 20000 Passions. </div>
          <RaisedButton
         label="SHARE YOURS"
         primary={true}
         linkButton={false}
         onTouchTap={this.handleDialogOpen}
         style={{marginTop:'185px',width:'325px',height:'57px',fontSize:'25px',fontWeight:Typography.fontWeightLight}}
         />
        </div>

        <div style = {styles.rightVideo}>
          <iframe width="560" height="349" src="https://www.youtube.com/embed/Ew9stms-6pY" frameborder="0" allowfullscreen ></iframe>
        </div>
      </div>

    );
  }

  _getFAQ() {
    let styles = {
      root: {
        height: '960px',
        backgroundColor: '#01579B',
        backgroundImage: 'url("images/lights.png")',
      },
      content: {
        margin: '0 auto'
      },
      title: {
        fontWeight: Typography.fontWeightLight,
        fontSize: '44px',
        lineHeight: '28px',
        paddingLeft: '120px'
      },
      questions: {
        width: '500px',
        margin: '0 auto',
        paddingTop: '100px'
      },
      oneQ: {
        paddingBottom: '70px'
      }
    };
    return (
      <FullWidthSection
      style={styles.root}
      useContent={true}
      contentStyle={styles.contents}
      contentType="p"
      className="home-faq">
        <div style={styles.content}>
          <div style={styles.title}>QUESTIONS? ANSWERED HERE.</div>
          <div style= {styles.questions}>
            <div style={styles.oneQ}>
              <h4> Who Cares?</h4>
              Well, there’s an enormous amount of potential creative energy on this campus that we believe is suppressed.
              More than ever this world needs people who care strongly and we know there are thousands of people like
              this on campus. The only problem is, there’s no way for you all to express what that actually is.
              That’s why we put this event together. To inspire, convene, and acknolwedge the truly extraordinary
              capabilities and ideas.
            </div>
            <div style={styles.oneQ}>
              <h4> Great! What Can I Do?</h4>
              On April 21st from 9am-9pm we’ll have pitch stations set up around campus (Trabant & Perkins)
              to inspire you to share your passions on this site and in person. If you can’t make it in person,
              that’s alright, post your thoughts on this site so we can collect and share all of the wonderful
              things you guys have come up with. :)
            </div>
            <div style={styles.oneQ}>
              <h4>Now Share, Share, Share! And Vote!</h4>
              Once you’ve gotten your quick pitch up on board, make sure to get your friends to vote in on
              the action and ask them to share their own ideas! Hint, there’ll be a pretty generous
              prize to some of the highest voted ones.
            </div>
          </div>
        </div>
      </FullWidthSection>
    );
  }

  render() {
    console.log(this.state.user);
    let style = {
      root: {
        backgroundColor: '#eeeeee',
        height: '580px',
        zIndex: 0,
        width: '100%',
        marginTop: '-3px',
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
        <div style={{backgroundColor: "#eeeeee"}}>

        <div className="homepage-hero-module">
         <div className="video-container">
                <div className="filter"></div>
                <video preload="auto" autoPlay loop="loop" className="fillWidth" src={video}>
                <source/>
                </video>
                <div zDepth={1}
                     rounded={false}
                     style={style.root}>
                  {this._getTitle()}
                </div>
          </div>
        </div>

        {this._getHomePurpose()}
        {this._getIntro()}
        {this._getFAQ()}
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
      <div style={{backgroundColor: "#eeeeee"}}>

      <div className="homepage-hero-module">
       <div className="video-container">
              <div className="filter"></div>
              <video preload="auto" autoPlay loop="loop" className="fillWidth" src={video}>
              <source/>
              </video>
              <div zDepth={1}
                   rounded={false}
                   style={style.root}>
                {this._getTitle()}
              </div>
        </div>
      </div>

        {this._getHomePurpose()}
        {this._getIntro()}
        {this._getFAQ()}
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
