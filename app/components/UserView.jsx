import React from 'react';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import { PropTypes, Link } from 'react-router';
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
import styles from 'scss/components/_about';

export default class UserView extends React.Component {
	constructor(props) {
		super(props);
		this.state = UserStore.getState();
		this.states = PostsStore.getState();
    this.state.fixedHeader = true;
     this.state.fixedFooter = true;
     this.state.stripedRows = false;
     this.state.showRowHover = false;
     this.state.selectable = true;
     this.state.multiSelectable = false;
     this.state.enableSelectAll = false;
     this.state.deselectOnClickaway = true;
     this.state.height = '300px';
	}

	componentDidMount() {
    let link = window.location.href;
    let linkArr = link.split('/');
    let valId = linkArr[linkArr.length-1];
    UserActions.getCompleteProfile();
    UserActions.getAnotherUsersProfile(valId);
		UserStore.listen(this._onChange);
		PostsStore.listen(this._onChanges);
		
	}

	componentWillUnmount() {
		UserStore.unlisten(this._onChange);
		PostsStore.unlisten(this._onChanges);
	}


	_onChange = () => {
  	this.setState({
      user: UserStore.getState().user,
      userCompleteData: UserStore.getState().userCompleteData,
      anotherUser: UserStore.getState().anotherUser,
      anotherUsersProfile: UserStore.getState().anotherUsersProfile,
      anotherUsersPosts: UserStore.getState().anotherUsersPosts,
      postsCopy: UserStore.getState().anotherUsersPosts,
      anotherCopy: UserStore.getState().anotherUsersPosts,
      anotherUsersComments: UserStore.getState().anotherUsersComments
    });
  }

  _onChanges = () => {
  	this.setState({
      posts: PostsStore.getState().posts,
      singleposts: PostsStore.getState().singleposts,
      nestedComments: PostsStore.getState().nestedComments
    });
  }

  _editComment = () => {
  console.log("Editing comment");
}

_deleteComment = () => {
  console.log("Deleting comment");
}

  _authorSearch = (event) => {
    let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.author.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({anotherUsersPosts: updatedList});
  }

  _titleSearch = (event) => {
     let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({anotherUsersPosts: updatedList});
  }
  

  _likesSearch = (event) => {
  let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.upvotes == event.target.value;
  });
    this.setState({anotherUsersPosts: updatedList});
  
  }

  _viewsSearch = (event) => {
  let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.views == event.target.value;
  });
    this.setState({anotherUsersPosts: updatedList});
  
  }

  _resetSearch = () => {
    let anotherCopy = this.state.anotherCopy;
    this.setState({anotherUsersPosts: anotherCopy});
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

 let prof = this.state.anotherUsersProfile;
 console.log(prof);
if(this.state.anotherUsersProfile != null || undefined) {
  firstName = prof.firstName;
  lastName = prof.lastName;
  gender = prof.gender;
  location = prof.location;
  website = prof.website;
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

</FullWidthSection>
      </div>
      );
  }


  render() {
  	//console.log(this.state.posts);
    console.log(this.state.anotherUser);
        let displayNodes;
        let user = UserStore.getState().user.get('authenticated');
    let posts = this.state.anotherUsersPosts;
    let comments = this.state.anotherUsersComments;
    //console.log(posts);

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
                <TableRowColumn><FlatButton label="Edit Comment" onTouchTap={this._editComment}></FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton label="Delete Comment" onTouchTap={this._deleteComment}></FlatButton></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>


      );
    }
    
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
                if(user){
                if(post.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }}
            )()} label="Like" onTouchTap={function() { 
              if(user == false){
                alert("Must be logged in to upvote!");
              } else {
              PostsActions.upvotePost(post._id); 
              let likeButton = document.getElementById('likeButton' + key); 
              let likeNumber = document.getElementById('likeNumber' + key); 
              console.log(post.isUpvoted);
              if(post.isUpvoted) { 
                console.log("Trying to update color to black?");
                likeButton.style.color = "black"; 
                post.upvotes = post.upvotes - 1;
                likeNumber.innerHTML = post.upvotes;
                post.isUpvoted = false; 

                likeNumber.style.color ="black";
              } else { 
                console.log("Trying to update color back to green");
                likeButton.style.color = "green";
                post.upvotes = post.upvotes + 1; 
                likeNumber.innerHTML = post.upvotes;
                post.isUpvoted = true; 
                likeNumber.style.color = "green";}} }}/>
              
              <span id = {"likeNumber" + key} style={(() => { 
                if(user) {
                if(post.isUpvoted) {
                  return{color: "green"};
                }
                else {
                  return {color: "black"};
                }
              }}
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
    console.log(this.state.userCompleteData);
    console.log(posts);
    console.log(comments);

    return (
      <div>
      <div className={styles.about} style={{backgroundColor: "#2F2F2F"}}>
        {this.getProfileInfo()}
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
      </div>
    );
  }
}
