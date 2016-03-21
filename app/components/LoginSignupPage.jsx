import React from 'react';
import styles from 'scss/components/_about';
import { PropTypes } from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';

const { AppBar,
      AppCanvas,
      FontIcon,
      FlatButton,
      ClearFix,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      RefreshIndicator,
      TextField,
      Styles,
      Tab,
      Tabs,
      Paper} = require('material-ui');

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;



export default class LoginSignupPage extends React.Component {

  constructor(props, context) {
  	super(props, context);
  	this.state = UserStore.getState();
  	this.context = context;
  }

  componentDidMount() {
  	UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
  	UserStore.unlisten(this._onChange);
  }

  componentDidUpdate() {

  	//console.log(this.context.history);
  	//if(this.state.user.get('authenticated')){
  		//this.context.history.push('/');
  	//}

  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  _onChange = () => {
  	this.setState({
      user: UserStore.getState().user
    });
  }

  _onLoginSubmit = () => {
    let email = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    UserActions.manuallogin({
      email: email,
      password: password
    });

   
  }

   _onSignupSubmit = () => {
    let email = this.refs.emailsignup.getValue();
    const password = this.refs.passwordsignup.getValue();
    const firstName = this.refs.firstName.getValue();
    const lastName = this.refs.lastName.getValue();
    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    UserActions.register({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    });

    
  }

  onTabChange(isLogin) {

  }

  _onLogout = () => {
    UserActions.logout();
  }

  render() {
    
  	console.log(this.state.user.get('authenticated'));
  	/*if(this.state.user.get('authenticated')){
  		this.context.history.goBack();
  	}
  	*/
  	let style = {
  	
  	liveExamplePaper: {
        backgroundColor: '#2F2F2F',
        marginTop: '64px',
        marginBottom: 32,
        margin: '0 auto',
        color: 'white', 
        overflow: 'hidden',
        width: '100%'
      },
    
    liveExampleBlock: {
        borderRadius: '0 0 2px 0',
        margin: 0,
        padding: Spacing.desktopGutter
      }

  	};

  	let renderedResult;

   	if (this.state.user.get('isWaiting')) {
   		renderedResult = (
   			<Paper style = {style.liveExamplePaper} zDepth={0}>
			<Tabs style = {style.liveExampleBlock}>
	        	<Tab label="Login" onClick={this.onTabChange.bind(this, false)} style ={{backgroundColor: '#4527A0'}}>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Username"  hintText="Login ID/Email" ref = "email"/>
	        	<RefreshIndicator size={80} left={600} top={50} status="loading" />
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Password"  hintText="Password" type = "password" ref = "password" />
	        	<br/>
	        	<RaisedButton label="Log In" primary={true} onClick = {this._onLoginSubmit} />
	        	<br/>
	        	</Tab>
	        	<Tab label="Register" onClick={this.onTabChange.bind(this, false)} style ={{backgroundColor: '#4527A0'}}>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Email" hintText="Login ID/Email" ref = "emailsignup"/>
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Create Password"  hintText="Password" type = "password" ref = "emailpassword" />
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="First Name" hintText="LastName" ref = "firstName"/>
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Last Name" hintText="LastName"  ref = "lastName"/>
	        	<br/>

	        	<RaisedButton label="Sign up" primary={true} onClick = {this._onSignupSubmit} />
	        	</Tab>
	        </Tabs>
        </Paper>
   		);
   	}

   	else {
      if((!this.state.user.get('isWaiting') && (!this.state.user.get('authenticated')))) {
   		renderedResult = (
   			<Paper style = {style.liveExamplePaper}>
			<Tabs style = {style.liveExampleBlock}>
	        	<Tab label="Login" onClick={this.onTabChange.bind(this, false)} style ={{backgroundColor: '#4527A0'}}>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Username"  hintText="Login ID/Email" ref = "email" />
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Password"  hintText="Password" type = "password" ref = "password"  />
	        	<br/>
	        	<RaisedButton label="Log In" primary={true} onClick = {this._onLoginSubmit} />
	        	<br/>
	        	</Tab>
	        	<Tab label="Register" onClick={this.onTabChange.bind(this, false)} style ={{backgroundColor: '#4527A0'}}>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Email" hintText="Login ID/Email" ref = "emailsignup"/>
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Create Password"  hintText="Password" type = "password" ref = "passwordsignup" />
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="First Name" hintText="LastName" ref = "firstName"/>
	        	<br/>
	        	<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Last Name" hintText="LastName"  ref = "lastName"/>
	        	<br/>

	        	<RaisedButton label="Sign up" primary={true} onClick = {this._onSignupSubmit} />
	        	</Tab>
	        </Tabs>
        </Paper>
   		  );
      }

    if((this.state.user.get('authenticated') && (!this.state.user.get('isWaiting')))) {
      renderedResult = (
          <Paper style = {style.liveExamplePaper}>
      <Tabs style = {style.liveExampleBlock}>
            <Tab label="Logged In" onClick={this.onTabChange.bind(this, false)} style ={{backgroundColor: '#4527A0'}}>
            <h1>You are now logged in!</h1>
            <h3>You can log out here if you logged in with the wrong account, or hit the logout button to sign in with a different account</h3>
            <h3>Otherwise you can close this modal with the close button below or click outside of it</h3>
            <FlatButton label = "Log out" primary={true} onClick={this._onLogout} />
            </Tab>
            <Tab label="Register" onClick={this.onTabChange.bind(this, false)} style ={{backgroundColor: '#4527A0'}}>
            <h1>Your are logged in!</h1>
            <h3>You must log out below if you want to signup with a new account</h3>
            <FlatButton label = "Log out" primary={true} onClick={this._onLogout} />
            </Tab>
          </Tabs>
        </Paper>
        );
    }
   }

    return (
      <div className={styles.about}>
        {renderedResult}
      </div>
    );
  }
}

LoginSignupPage.contextTypes = { history: PropTypes.history };