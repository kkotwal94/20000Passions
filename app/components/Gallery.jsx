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

/* Just sketching out the idea 
  _checkIfUpvoted = (allPosts, userData) => {
  	for(let i = 0; i< allPosts.length; i++){
  		for(let j = 0; j < userData.upvotedP.length; j++) {
  			if(allPosts[i]._id == userData.upvotedP[j]) {
  				allPosts[i].isUpvoted = true;
  			}
  			
  			
  		}
  	}

  	//this.setState({posts: allPosts});
  }
*/
   

  render() {
  	let posts = [];
  	posts = this.state.posts;
  	//console.log(this.state.posts);
  	//console.log(posts);
    let user = UserStore.getState().user.get('authenticated');
  	let displayNodes = posts.map((post, key) =>
  			
	       		<div className = {style.col + ' ' + style.col__col312} style={{minHeight: "590px"}}id = {"gallery" + key} key = {key}> 

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
       		</div>
       	</div>
    );
  }
}
