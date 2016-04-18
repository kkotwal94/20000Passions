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
      Dialog,
      ListItem,
      List,
      IconButton,
      RaisedButton,
      Styles,  
      TextField,
      Table,
      TableHeaderColumn,
      TableRow,
      TableHeader,
      TableRowColumn,
      TableBody,
      TableFooter,
      Toggle,
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
     this.state.fixedHeader = true;
     this.state.fixedFooter = true;
     this.state.stripedRows = false;
     this.state.showRowHover = false;
     this.state.selectable = true;
     this.state.multiSelectable = false;
     this.state.enableSelectAll = false;
     this.state.deselectOnClickaway = true;
     this.state.height = '300px';
     this.state.open = false;
     this.state.openComment = false;
     this.state.postEditId = 0;
     this.state.postEditTitle = "";
     this.state.postEditBody = "";
     this.state.postEditThumbnail = "";
     this.state.postDeleteId = 0;
     this.state.commentDeleteId = 0;
     this.state.commentEditId = 0;
     this.state.commentEditBody = "";
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

  handleDialogOpen = () => {
    this.setState({open: true});
    //alert("hellow world");
  }
  

  handleDialogClose = () => {
    this.setState({open: false});
  }

  handleDialogOpenComment = () => {
    this.setState({openComment: true});
    //alert("hellow world");
  }
  

  handleDialogCloseComment = () => {
    this.setState({openComment: false});
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
      anotherCopy: PostsStore.getState().userPosts,
      comments: PostsStore.getState().postComments
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

_handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

_handleChange = (event) => {
    this.setState({height: event.target.value});
  };

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

  _editProfile = (id, title, body, thumbnail) => {

    this.setState({
                  postEditId: id,
                  postEditBody: body,
                  postEditTitle: title,
                  postEditThumbnail: thumbnail,
                  open: true
    });
    //console.log("Hello");
    //this.handleDialogOpen;
  }

  _updatePost = () => {
     console.log("updating post");
            let data = {
              id: this.state.postEditId,
              title: this.refs.titleUpdate.getValue(),
              body: this.refs.descriptionUpdate.getValue(),
              thumbnail: this.refs.descriptionThumbnail.getValue()
            };
            //console.log(this.state.postEditId);
            PostsActions.editPost(this.state.user.get('id'),this.state.postEditId, data);
  }


  _editComment = (id, body) => {
    this.setState({
      commentEditId: id,
      commentEditBody: body,
      openComment: true
    });
    console.log("hello");
}

_updateComment = () => {
  console.log("Updating comment");
  let data = {
    id: this.state.commentEditId,
    body: this.refs.commentUpdate.getValue()
  };

  PostsActions.editComment(this.state.user.get('id'), this.state.commentEditId, data);
  this.setState({ open: false});
}

  _deleteComment = (id, postid) => {
  let deleteC = confirm("Are you sure you want to delete this comment?");
  if(deleteC) {
    this.setState({
      commentEditId: id
    });
    PostsActions.deleteComment(this.state.user.get('id'), postid, id);
    this.setState({ openComment : false});
  }
}

_deletePost = (id) => {
   let postC = confirm("Are you sure you want to delete this post?");
   if(postC) {
  PostsActions.removePost(this.state.user.get('id'), id);
  this.setState({ openComment : false});
  }
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
    console.log(this.state.posts);
    console.log(this.state.comments);
    let displayNodes;
    let posts = this.state.posts;
    let comments = this.state.comments;
    const tablestyles = {
      propContainerStyle: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
      },
      propToggleHeader: {
        margin: '20px auto 10px',
      },
    };

    let commentContainer = (
      <div></div>
      );


    if(comments != undefined){ 
     commentContainer = (
      <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}
        >
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Users Comments" style={{textAlign: 'center'}}>
                User Comments
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Author">Author</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Comment">Comment</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Upvotes">Upvotes</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Upvotes">Edit</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Upvotes">Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {comments.map( (comment, index) => (
              <TableRow key={index} selected={comment.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{comment.author}</TableRowColumn>
                <TableRowColumn>{comment.body}</TableRowColumn>
                <TableRowColumn>{comment.upvotes}</TableRowColumn>
                <TableRowColumn><FlatButton label="Edit Comment" onTouchTap={() => this._editComment(comment._id, comment.body)}></FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton label="Delete Comment" onTouchTap={() => this._deleteComment(comment._id, comment.post)}></FlatButton></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>


      );
    }
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
              <Link to={"/gallery/" + post._id}><FlatButton label="View" style={{minWidth: '10px'}}/></Link>
              <FlatButton id ={"likeButton" + key} style={(() => { 
                if(post.isUpvoted) {
                  return{color: "green", minWidth: "10px"};
                }
                else {
                  return {color: "black", minWidth: "10px"};
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
                  return{color: "green", minWidth: "10px"};
                }
                else {
                  return {color: "black", minWidth: "10px"};
                }
              }
            )()}> {post.upvotes}</span>
            
              <FlatButton style={{minWidth: '10px'}} id ={"editButton" + key} label="Edit" onTouchTap={() => this._editProfile(post._id, post.title, post.body, post.thumbnail)}/>
              <FlatButton style={{minWidth: '10px'}} id ={"deleteButton" + key} label="Delete" onTouchTap={() => this._deletePost(post._id)}/>
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

    let dialogStyle = {

      root: {
        width: '100%'
      },

      mainDialog: {
        backgroundColor: "#2f2f2f"
      }

    };

    let DialogEdit = (
    <Dialog
          
          
          bodyStyle={dialogStyle.mainDialog}
          contentStyle={dialogStyle.root}
          modal={false}
          onRequestClose={this.handleDialogClose}
          open={this.state.open}>
          <TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Title" defaultValue={this.state.postEditTitle}  ref = "titleUpdate" name="title" /> &nbsp;
          <br/>
          <TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Description"  defaultValue={this.state.postEditBody}  ref = "descriptionUpdate" name="author" /> &nbsp;
          <br/>
          <TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Description"  defaultValue={this.state.postEditThumbnail}  ref = "descriptionThumbnail" name="thumbnail" /> &nbsp;
          <br/>
          <RaisedButton primary={true} label = "Update Post" onTouchTap={this._updatePost}></RaisedButton>
        </Dialog>
        );

    let CommentDialogEdit = (
    <Dialog
          
          
          bodyStyle={dialogStyle.mainDialog}
          contentStyle={dialogStyle.root}
          modal={false}
          onRequestClose={this.handleDialogCloseComment}
          open={this.state.openComment}>
          <TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Comment Body" defaultValue={this.state.commentEditBody}  ref = "commentUpdate" name="title" /> &nbsp;
          <RaisedButton primary={true} label = "Update Comment" onTouchTap={this._updateComment}></RaisedButton>
        </Dialog>
        );
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
          <br/>
          <br/>
          <div className = {styler.row + ' ' + styler.row__group}>
          {commentContainer}
          </div>
          <div>
          {DialogEdit}
          </div>
          <div>
          {CommentDialogEdit}
          </div>
      </div>
    );
  }
}
