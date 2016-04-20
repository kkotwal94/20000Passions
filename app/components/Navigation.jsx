import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import LoginSignupPage from 'components/LoginSignupPage';
import chromecon from 'images/chrome.png';
import logo from 'images/20klogo.png';
//import leftNav from './leftNav';

const { AppBar,
      AppCanvas,
      Dialog,
      FontIcon,
      IconButton,
      EnhancedButton,
      LeftNav,
      Menu,
      MenuItem,
      Mixins,
      RaisedButton,
      Styles,
      Tab,
      Tabs,
      FlatButton,
      Paper} = require('material-ui');

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;

const SelectableList = SelectableContainerEnhance(List);

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

import styles from 'scss/components/_navigation';
import {PropTypes} from 'react-router';

export default class Navigation extends React.Component {


  constructor(props) {
  super(props);
  this.state = UserStore.getState();
  this.state.open = false;
  this.state.leftNavOpen = false;
  }


    static contextTypes = {
        router: React.PropTypes.func
    }

  toggle = () => {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  }

  componentDidMount() {
    //console.log(window.location);
    //window.onresize = setTabsState;
    UserStore.listen(this._onChange);
    this.setState({ tabIndex: this._getSelectedIndex()});
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 871)});
    }.bind(this);
    setTabsState();
    //console.log(window.location);
    window.onresize = setTabsState;
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      tabIndex: this._getSelectedIndex()

    });
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }


  handleDialogOpen = () => {
    this.setState({open: true});
    //alert("hellow world");
  }


  handleDialogClose = () => {
    this.setState({open: false});
  }


  _getSelectedIndex() {
    //console.log(this.context.history.isActive('/'));
    return this.context.history.isActive('/') ? '1' :
      this.context.history.isActive('/gallery') ? '2' :
      this.context.history.isActive('/profile') ? '3' :
      //this.context.history.isActive('/login') ? '4' :
      this.context.history.isActive('/pitch') ? '7' :
      this.context.history.isActive('/about') ? '5' : '';
  }

  _handleTabChange = (value, e, tab) => {
    //console.log(this.context.history);
  if(tab.props.route != '/login') {
    this.context.history.pushState(null, tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  }
  }



_onLogout = () => {
  UserActions.logout();
}

_getTabs() {


  let styles = {
      root: {
        backgroundColor: '#333',
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      container: {
        position: 'absolute',
        right: (Spacing.desktopGutter/2) + 48,
        bottom: 0,
      },
      span: {
        color: Colors.white,
        fontWeight: Typography.fontWeightLight,
        left: 65,
        top: 18,
        position: 'absolute',
        fontSize: 26,
      },
      svgLogoContainer: {
        position: 'fixed',
        width: 300,
        left: Spacing.desktopGutter,
      },
      svgLogo: {
        width: 65,
        height: 65,
        backgroundColor: '#333',
        position: 'absolute',
        top: 0,
      },
      tabs: {
        width: 600,
        bottom:0
      },
      tab: {
        height: 64,
        backgroundColor: '#333'
      },

    };


     const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose} />,
    ];

    let renderedResult;

    let materialIcon = this.state.tabIndex !== '0' ? (
     <EnhancedButton
        style={styles.svgLogoContainer}
        linkButton={true}
        href="/">
        <img style={styles.svgLogo} src={chromecon}/>

        <span style={styles.span}>20000passions</span>

      </EnhancedButton>) : null;

    if (this.state.user.get('authenticated')) {
    renderedResult = (

        <Paper zDepth={0}
             rounded={false}
             style={styles.root}
        >

      {materialIcon}

          <div style={styles.container}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange}>
              <Tab
                value="1"
                label="DASHBOARD"
                style={styles.tab}
                route="/" />
              <Tab
                value="2"
                label="GALLERY"
                style={styles.tab}
                route="/gallery" />
              <Tab
                value="3"
                label="PROFILE"
                style={styles.tab}
                route="/profile"/>
              <Tab
                value="7"
                label="PITCH"
                style={styles.tab}
                route="/pitch"/>
              <Tab
                value="6"
                label="LOGOUT"
                style={styles.tab}
                onClick ={this._onLogout}
                route="/"/>

                <Tab
                value="5"
                label="ABOUT"
                style={styles.tab}
                route="/about" />
            </Tabs>


          </div>

        </Paper>


    );
}

else {
  renderedResult = (

        <Paper zDepth={0}
             rounded={false}
             style={styles.root}
        >

            {materialIcon}

          <div style={styles.container}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange}>
              <Tab
                value="1"
                label="DASHBOARD"
                style={styles.tab}
                route="/" />
              <Tab
                value="2"
                label="GALLERY"
                style={styles.tab}
                route="/gallery" />
              <Tab
                value="4"
                label="LOGIN/SIGNUP"
                style={styles.tab}
                onActive={this.handleDialogOpen}
                route="/login">



                </Tab>

                <Tab
                value="5"
                label="ABOUT"
                style={styles.tab}
                route="/about" />
            </Tabs>


          </div>

        </Paper>

    );
}
return (
      <div>
        {renderedResult}
      </div>

    );
}

_getAppBar() {
    let title =
      this.context.history.isActive('/') ? 'Dashboard' :
      this.context.history.isActive('/gallery') ? 'Gallery' :
      this.context.history.isActive('/profile') ? 'Profile' :
      this.context.history.isActive('/pitch') ? 'Create Pitch' :
     // this.context.history.isActive('/login') ? 'Login' : '':
      this.context.history.isActive('/about') ? 'About' : '';


    /*let loginTitle =
      this.context.history.isActive('/') ? 'Dashboard' :
      this.context.history.isActive('/channels') ? 'Channels' :
      this.context.history.isActive('/profile') ? 'Profile' :
      this.context.history.isActive('/about') ? 'About' :
      this.context.history.isActive('/logout') ? 'Logout' : '';
    */
    let githubButton = (
      <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.toggle}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={{position: 'fixed', top: 0, backgroundColor: '#333'}}/>
      </div>);
  }


_onLeftIconButtonTouchTap = () => {
     console.log(this.refs.leftNav);
     this.refs.leftNav.toggle();
  }

handleClose = () => this.setState({leftNavOpen: false});

handleChangeRequestLeftNav = (open) => {
    this.setState({
      leftNavOpen: open
    });
  }

render() {
//console.log(this.state.user);
//console.log(this.state.open);
let renderedresult;

let header = {

     root: { cursor: 'pointer',
      fontSize: 24,
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: "#333",
      paddingLeft: Spacing.desktopGutter,
      marginBottom: 8 }
    };

let dialogStyle = {

  root: {
    width: '100%'
  },

  mainDialog: {
    backgroundColor: "#2F2F2F"
  }

};
let title =
      this.context.history.isActive('/') ? 'Dashboard' :
      this.context.history.isActive('/gallery') ? 'Gallery' :
      this.context.history.isActive('/profile') ? 'Profile' :
      this.context.history.isActive('/pitch') ? 'Create Pitch' :
      //this.context.history.isActive('/login') ? 'Login' :
      this.context.history.isActive('/about') ? 'About' : '';



    let githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}
        style={styles.github} />
    );

    let githubButton2 = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );



    if (this.state.user.get('authenticated')) {
      renderedresult = (
<LeftNav width={200} docked = {false} openRight={false} open={this.state.leftNavOpen} onRequestChange={this.handleChangeRequestLeftNav}>
        <div style = {header.root}>
        200000Pitches
        </div>
          <SelectableList
           valueLink={{
            value: this._getSelectedItem,
            requestChange: this.handleRequestChangeList,
          }}>

          <ListItem
            value="/"
            primaryText="Dashboard"/>

          <ListItem
            value="/gallery"
            primaryText="Gallery"/>

          <ListItem
            value="/profile"
            primaryText="Profile"/>

          <ListItem
            value="/pitch"
            primaryText="Pitch"/>

          <ListItem
            value="null"
            onClick = {this._onLogout}
            primaryText="Logout"/>

          <ListItem
            value="/about"
            primaryText="About"/>
          </SelectableList>
        </LeftNav>

        );
    }

    else {
      renderedresult = (
        <LeftNav width={200} docked = {false} openRight={false} open={this.state.leftNavOpen} onRequestChange={this.handleChangeRequestLeftNav}>
        <div style = {header.root}>

        20000Passions

        </div>
          <SelectableList
           valueLink={{
            value: this._getSelectedItem,
            requestChange: this.handleRequestChangeList,
          }}>

          <ListItem
            value="/"
            primaryText="Dashboard"/>

          <ListItem
            value="/gallery"
            primaryText="Gallery"/>

          <ListItem
            value="/login"
            primaryText="Login/Register"/>

          <ListItem
            value="/about"
            primaryText="About"/>
          </SelectableList>
        </LeftNav>
        );
    }

    //console.log(this.context.history);
    //console.log(this.props);
    //console.log(this.router);

     const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleDialogClose} />
    ];

    return (
      <AppCanvas>
        {githubButton}
        {this.state.renderTabs ? this._getTabs(): this._getAppBar()}

        {renderedresult}
        <Dialog


          bodyStyle={dialogStyle.mainDialog}
          contentStyle={dialogStyle.root}
          modal={false}
          onRequestClose={this.handleDialogClose}
          open={this.state.open}>
          <LoginSignupPage />
        </Dialog>

      </AppCanvas>
    );
  }


  _getSelectedItem = () => {
     return this.context.history.isActive('/') ? 'Dashboard' :
      this.context.history.isActive('/gallery') ? 'Gallery' :
      this.context.history.isActive('/profile') ? 'Profile' :
      this.context.history.isActive('/pitch') ? 'Pitch' :
      //this.context.history.isActive('/login') ? 'Login' :
      this.context.history.isActive('/about') ? 'About' : '';

  }


  handleRequestChangeList = (event, value) => {
    if(value == "null") {
        this.setState({
        leftNavOpen: false,
      });
    }
    else {
        this.context.history.pushState(null, value);
        this.setState({
          leftNavOpen: false,
        });
    }

  }
}

Navigation.contextTypes = { history: PropTypes.history };
Navigation.propTypes = { UserStore: React.PropTypes.object };
