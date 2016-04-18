import React from 'react';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import style from 'scss/components/_layout';
import { PropTypes, Link} from 'react-router';


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
      Dialog,
      RaisedButton,
      Styles,  
      TextField,
      Paper,
  	  Snackbar } = require('material-ui');
const { Colors, Spacing, Typography } = Styles;

import styles from 'scss/components/_about';

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		//this.state = UserStore.getState();
		this.state = PostsStore.getState();
    this.state.postEditId = 0;
     this.state.postEditTitle = "";
     this.state.postEditBody = "";
     this.state.postEditThumbnail = "";
     this.state.postDeleteId = 0;
     this.state.open = false;

	}

	componentDidMount() {
		PostsActions.allPosts();

		//UserStore.listen(this._onChange);
		PostsStore.listen(this._onChanges);
		
	}

	componentWillUnmount() {
		//UserStore.unlisten(this._onChange);
		PostsStore.unlisten(this._onChanges);
	}

  handleDialogOpen = () => {
    this.setState({open: true});
    //alert("hellow world");
  }
  

  handleDialogClose = () => {
    this.setState({open: false});
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


	_onChange = () => {
  	this.setState({

      user: UserStore.getState().user

    });
  }

  _onChanges = () => {
  	this.setState({
      posts: PostsStore.getState().posts,
      postsCopy: PostsStore.getState().posts,

      anotherCopy: PostsStore.getState().posts,
      singleposts: PostsStore.getState().singleposts,
      nestedComments: PostsStore.getState().nestedComments,
      userCompleteData: PostsStore.getState().userCompleteData
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
     let userState = UserStore.getState().user.get('id');
            let data = {
              id: this.state.postEditId,
              title: this.refs.titleUpdate.getValue(),
              body: this.refs.descriptionUpdate.getValue(),
              thumbnail: this.refs.descriptionThumbnail.getValue()
            };
            //console.log(this.state.postEditId);
            PostsActions.editPost(userState,this.state.postEditId, data);
            this.setState({ open : false});
  }

  _deletePost = (id) => {
    let userState = UserStore.getState().user.get('id');
   let postC = confirm("Are you sure you want to delete this post?");
   if(postC) {
  PostsActions.removePost(userState, id);
  this.setState({ open : false});
  }
}


  render() {
  	let posts = [];
  	posts = this.state.posts;
  	//console.log(this.state.posts);
  	//console.log(posts);
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
    let user = UserStore.getState().user.get('authenticated');
    let isAdmin = false;
    if(user){
    isAdmin = this.state.userCompleteData.isAdmin;
    }
    let displayNodes = (
      <div></div>
      );
    console.log(isAdmin);

    if(isAdmin) {
      displayNodes = posts.map((post, key) =>
        
            <div className = {style.col + ' ' + style.col__col312} style={{minHeight: "590px"}}id = {"gallery" + key} key = {key}> 

          <Card>
            <CardHeader
              title={post.title} 
              subtitle="pitch"
              avatar={post.thumbnail} />
            <Link to={"/gallery/" + post._id}><CardMedia>
              <img style={{maxHeight:'400px'}} src={post.thumbnail} />
            </CardMedia>
            </Link>
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
                if(user){
                if(post.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
            }
            )()} label="Like" onTouchTap={function() { if(user == false) { alert("You must be logged in to upvote")} else { PostsActions.upvotePost(post._id); let likeButton = document.getElementById('likeButton' + key); let likeNumber = document.getElementById('likeNumber' + key); if(post.isUpvoted) { likeButton.style.color = "black"; likeNumber.innerHTML = post.upvotes - 1; likeNumber.style.color ="black";} else { likeButton.style.color = "green"; likeNumber.innerHTML = post.upvotes + 1; likeNumber.style.color = "green";} } }}/>
              
              <span id = {"likeNumber" + key} style={(() => { 
                if(user){
                if(post.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }
              }

            )()}> {post.upvotes}</span>
          
              <FlatButton id={"editButton" + key} label ="Edit" onTouchTap={() => this._editProfile(post._id, post.title, post.body, post.thumbnail)}/>
              <FlatButton id={"deleteButton" + key} label ="Delete" onTouchTap={() => this._deletePost(post._id)}/>

              <span style={{float:"right", marginTop: "2%"}}>{post.views + " Views"}</span>
            

              

            </CardActions>
          </Card>

          
          
        </div>
        );
    }
    else {
  	 displayNodes = posts.map((post, key) =>
  			
	       		<div className = {style.col + ' ' + style.col__col312} style={{minHeight: "590px"}}id = {"gallery" + key} key = {key}> 

	  			<Card>
	  				<CardHeader
	  					title={post.title} 
	  					subtitle="pitch"
	  					avatar={post.thumbnail} />
	  				<Link to={"/gallery/" + post._id}><CardMedia>
	  					<img style={{maxHeight:'400px'}} src={post.thumbnail} />
	  				</CardMedia>
            </Link>
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
	  						if(user){
                if(post.isUpvoted) {
	  							return{color: "green"};
	  						}
	  						else {
	  							return {color: "black"};
	  						}
	  					}
            }
	  				)()} label="Like" onTouchTap={function() { if(user == false) { alert("You must be logged in to upvote")} else { PostsActions.upvotePost(post._id); let likeButton = document.getElementById('likeButton' + key); let likeNumber = document.getElementById('likeNumber' + key); if(post.isUpvoted) { likeButton.style.color = "black"; likeNumber.innerHTML = post.upvotes - 1; likeNumber.style.color ="black";} else { likeButton.style.color = "green"; likeNumber.innerHTML = post.upvotes + 1; likeNumber.style.color = "green";} } }}/>
	  					
	  					<span id = {"likeNumber" + key} style={(() => { 
                if(user){
	  						if(post.isUpvoted) {
	  							return{color: "green"};
	  						}
	  						else {
	  							return {color: "black"};
	  						}
              }
	  					}

	  				)()}> {post.upvotes}</span>
	  				
            

	  					<span style={{float:"right", marginTop: "2%"}}>{post.views + " Views"}</span>
	  				

	  					

	  				</CardActions>
	  			</Card>

	  			
	  			
	  		</div>
	  		)
    }
    return (
      <div className={styles.about}>
        <h1 style={{textAlign: "center"}}>Gallery</h1>

          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Title"  hintText="Search by Pitch Title" ref = "title" name="title" onChange={this._titleSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Author"  hintText="Search by Pitch Author" ref = "author" name="author" onChange={this._authorSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Likes"  hintText="Search by Pitch Likes" ref = "likes" name="likes" onChange={this._likesSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Views"  hintText="Search by Pitch views" ref = "views" name="views" onChange={this._viewsSearch}/> &nbsp;
        	<RaisedButton label="Reset Search" secondary = {true} onClick ={this._resetSearch}></RaisedButton>
        	<div id="gallery">
        	<div className = {style.row + ' ' + style.row__group}>
	       	{displayNodes}
	       	</div>
          <div>
          {DialogEdit}
          </div>
       		</div>
       	</div>
    );
  }
}
