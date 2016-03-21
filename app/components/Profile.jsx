import React from 'react';
import {PropTypes,Link} from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import styles from 'scss/components/_about';
import styler from 'scss/components/_layout';
import FullWidthSection from 'components/FullWidthSection';

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


export default class Profile extends React.Component {

  constructor(props) {
  	 super(props);
  	 this.state = UserStore.getState();
  	 this.state.autoHideDuration = 0;
  	 this.state.profileUpdateMessage = "Profile has been updated!";
  	 this.state.openSnack = false;
  }

  componentDidMount() {
  	UserActions.getProfile();
    PostsActions.getCompleteProfile();
  	PostsStore.listen(this._onChanges);
    UserStore.listen(this._onChange);
    
  }

  componentWillUnmount() {
  	PostsStore.unlisten(this._onChanges);
    UserStore.unlisten(this._onChange);
    
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }

  _onChanges = () => {
    this.setState({
      posts: PostsStore.getState().userPosts,
      postsCopy: PostsStore.getState().userPosts,
      anotherCopy: PostsStore.getState().userPosts
    })
  }

  _onProfileSubmit = () => {
    const firstName = this.refs.firstName.getValue();
    const lastName = this.refs.lastName.getValue();
    const gender = this.refs.gender.getValue();
    const website = this.refs.website.getValue();
    const location = this.refs.location.getValue();
    UserActions.updateProfile({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      website: website,
      location: location
    });

    
  }

_handleActionTouchTap = () => {
    //alert('Some action here....');
    this.setState({
      openSnack: false
    });
  };


_handleTouchTap = () => {
	this.setState({
		openSnack: true
	});
}

_handleRequestClose = () => {
    this.setState({
      openSnack: false
    });
}

  _authorSearch = (event) => {
    let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.author.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({posts: updatedList});
  }

  _titleSearch = (event) => {
     let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({posts: updatedList});
  }
  

  _likesSearch = (event) => {
  let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.upvotes == event.target.value;
  });
    this.setState({posts: updatedList});
  
  }

  _viewsSearch = (event) => {
  let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.views == event.target.value;
  });
    this.setState({posts: updatedList});
  
  }

  _resetSearch = () => {
    let anotherCopy = this.state.anotherCopy;
    this.setState({posts: anotherCopy});
  }


  getProfileInfo() {

  	let styles = {
      root: {
        backgroundColor: "#01579b",
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        height: '100px',
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },
      list: {
      	width: '45%',
      	float: 'left',
      	marginRight: '100px',
      	backgroundColor: '#2f2f2f'
      },

      update: {
      	width: '33%',
      	float: 'left',
      	backgroundColor: '#2f2f2f',
      	padding: '10px'
      },

      innerList: {
      	margin: '0 auto',
      	width: '95%',
      	marginBottom: '10px'
      }
  };

  	let firstName = "blah";
  	let lastName = "blah";
  	let gender = "loading"; 
  	let location = "loading";
  	let website = "loading";

  	/*if(this.state.user.get('data') === undefined) {
  		firstName = this.state.user.get('profile').get('firstName');
  		lastName = this.state.user.get('profile').get('lastName');
  		gender = this.state.user.get('profile').get('gender');
  		location = this.state.user.get('profile').get('location');
  		website = this.state.user.get('profile').get('website');

  	}

  	else {
*/ 
if(this.state.user.get('data') != undefined){
  	firstName = this.state.user.get('data').get('firstName');
  	lastName = this.state.user.get('data').get('lastName');
  	gender = this.state.user.get('data').get('gender');
  	location = this.state.user.get('data').get('location');
  	website = this.state.user.get('data').get('website');

  }


  if(firstName == "") {
  	firstName = "Needs to be set";
  }

  if(lastName == "") {
  	lastName = "Needs to be set";
  }

  if(gender == "") {
  	gender = "Needs to be set";
  }

  if(location == "") {
  	location = "Needs to be set";
  }

  if(website == "") {
  	website = "Needs to be set";
  }

  	return (
  		<div style={{marginTop: '-8px'}}>
  		<h1 className={styles.about__description} style={{color:"white"}}> {firstName + " " + lastName + "'s Profile Page"}</h1>
  		<FullWidthSection
        style={styles.root}
        useContent={false}
        contentStyle={styles.content}
        contentType="p"
        className="profileBio">

        <Paper style={styles.list}>

        <h1 style={{color:'white', paddingLeft: '10px'}}>{firstName + " 's bio"}</h1>

  		<List style={styles.innerList}>
  		<ListItem primaryText={firstName} />
  		<ListItem primaryText={lastName} />
  		<ListItem primaryText={gender} />
  		<ListItem primaryText={location} />
  		<ListItem primaryText={website} />
  		

  		</List>
  		</Paper>


  		<Paper style={styles.update} zDepth={2}>
  		<h2 style={{color: 'white'}}>Update Profile</h2>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update First N." hintText="name.." ref = "firstName"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Last N." hintText="last name.." ref = "lastName"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Gender" hintText="M/F" ref = "gender"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Location" hintText="State/Country" ref = "location"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Website" hintText="Personal Site/Social Media" ref = "website"/>
  		<br/>
  		<RaisedButton label="Update Info!" primary={true} onClick={this._onProfileSubmit} onTouchTap={this._handleTouchTap}/>
  		</Paper>


  		</FullWidthSection>
  		</div>
  		);
  }

  render() {
  	//console.log(this.state.user);
    //console.log(this.state.posts);
    let displayNodes;
    let posts = this.state.posts;
    //console.log(posts);
    if(posts != undefined) {
      displayNodes = posts.map((post, key) =>
            <div className = {styler.col + ' ' + styler.col__col312} style={{minHeight: "590px", maxHeight: "590px"}}id = {"gallery" + key} key = {key}> 
          <Card>
            <CardHeader
              title={post.title}
              subtitle="pitch"
              avatar={post.thumbnail} />
            <CardMedia>
              <img style={{maxHeight:'400px'}} src={post.thumbnail} />
            </CardMedia>
            <CardText style={{textOverflow: "ellipsis",
    width: "95%",
    whiteSpace: "nowrap",
    overflow: "hidden"}} >
            {post.body}
            <br/>
            <Link to={"/user/" + post.owner}>{"By " + post.author}</Link>
            </CardText>
            <CardActions>
              <Link to={"/gallery/" + post._id}><FlatButton label="View"/></Link>
              <FlatButton id ={"likeButton" + key} style={(() => { 
                if(post.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            )()} label="Like" onTouchTap={function() { PostsActions.upvotePost(post._id); 
              let likeButton = document.getElementById('likeButton' + key); 
              let likeNumber = document.getElementById('likeNumber' + key); 
              console.log(post.isUpvoted);
              if(post.isUpvoted) { 
                console.log("Trying to update color to black?");
                likeButton.style.color = "black"; 
                likeNumber.innerHTML = post.upvotes - 1; 
                likeNumber.style.color ="black";
              } else { 
                console.log("Trying to update color back to green");
                likeButton.style.color = "green"; 
                likeNumber.innerHTML = post.upvotes + 1; 
                likeNumber.style.color = "green";} }}/>
              
              <span id = {"likeNumber" + key} style={(() => { 
                if(post.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            )()}> {post.upvotes}</span>
            
              <FlatButton id ={"editButton" + key} label="Edit" onTouchTap={function() {console.log("Editing");}}/>
              <FlatButton id ={"deleteButton" + key} label="Delete" onTouchTap={function() {console.log("Deleting");}}/>
              <span style={{float:"right", marginTop: "2%"}}>{post.views + " Views"}</span>
            
            </CardActions>
          </Card>

          
          
        </div>
        );
    }

    else {
      displayNodes = (
          <div>Loading data</div>
        );
    }
    return (
      <div>
      <div className={styles.about} style={{backgroundColor: "#2F2F2F"}}>
        
        
        {this.getProfileInfo()}
      	 <Snackbar
          open={this.state.openSnack}
          message={this.state.profileUpdateMessage}
          action="Close"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._handleActionTouchTap}
          onRequestClose={this._handleRequestClose} />
      </div>
      <div id="gallery">
       <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Title"  hintText="Search by Pitch Title" ref = "title" name="title" onChange={this._titleSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Author"  hintText="Search by Pitch Author" ref = "author" name="author" onChange={this._authorSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Likes"  hintText="Search by Pitch Likes" ref = "likes" name="likes" onChange={this._likesSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Views"  hintText="Search by Pitch views" ref = "views" name="views" onChange={this._viewsSearch}/> &nbsp;
          <RaisedButton label="Reset Search" secondary = {true} onClick ={this._resetSearch}></RaisedButton>
          
          <div className = {styler.row + ' ' + styler.row__group}>
          {displayNodes}
          </div>
          </div>
      </div>
    );
  }
}
