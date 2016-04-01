import React, {Component} from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';
import image from 'images/pic.png';
import styles from 'scss/components/_layout';
import LinearProgress from 'material-ui/lib/linear-progress';
const { 
      Menu,
      Mixins,
      Divider,
      ListItem,
      List,
      RaisedButton,
      Styles,  
      TextField,
      Tabs,
      Tab,
      Slider,
      Paper,
      Snackbar } = require('material-ui');  

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;



export default class Pitch extends React.Component {

  constructor(props) {
  	super(props);
    this.state = {
      data_uri: null,
      processing: false,
      completed: 0,
      creating: false,
      title: null,
      description: null
    }
    this.state.type = "upload";

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });
    let data = new FormData(document.getElementById('formData'));
    let title = _this.refs.title.getValue();
    let body = _this.refs.description.getValue();
    let thumbnail = _this.refs.thumbnail.getValue();
    let data2 = {body: body, title: title, thumbnail: thumbnail};
    data.append("title", title);
    data.append("body", body);
    data.append("thumbnail", thumbnail);
      console.log(data2);
    const promise = $.ajax({
      url: '/file/video',
      type: "POST",
      data: data /*{
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      }*/,
      processData: false,
      xhr: function()
      {
      var xhr = new window.XMLHttpRequest();
      //Upload progress
      xhr.upload.addEventListener("progress", function(evt){
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          //Do something with upload progress
          //console.log(percentComplete);
          _this.setState({completed: percentComplete*100});
          //console.log(_this.state.completed);
        }
      }, false);
      //Download progress
      xhr.addEventListener("progress", function(evt){
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          //Do something with download progress
          console.log(percentComplete);
           _this.setState({completed: percentComplete*100});
        }
      }, false);
      return xhr;
      },
      contentType: false
      //dataType: 'json'
    });

    promise.done(function(data){
      //console.log(_this.state.data_uri);
      let title = _this.refs.title.getValue();
      let body = _this.refs.description.getValue();
      let thumbnail = _this.refs.thumbnail.getValue();
      let data2 = {body: body, title: title, thumbnail: thumbnail, type: _this.state.type};
      //let data2 = {body: body, title: title};
        _this.setState({
        processing: false,
        uploaded_uri: _this.state.data_uri,
        creating: true,
        title: title,
        body: body
      });
        const promise2 = $.ajax({
          url: '/posts',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data2)          
        });

    });
  }

  
  handleFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
      //console.log(this.state.data_uri);
    };

    reader.readAsDataURL(file);
  }

  _handleTouchTap = () => {
    this.setState({
      creating: false,
      uploaded_uri: null
    });
  }

  _handleVideoType = (type) => {
    this.setState({
      type: type
    });
    console.log(type);
  }

  _submitYoutubePost = () => {
     let title = this.refs.titley.getValue();
      let body = this.refs.descriptiony.getValue();
      let thumbnail = this.refs.thumbnaily.getValue();
      let videoURL = this.refs.youtubeid.getValue(); 
      let type = this.state.type;

      this.setState({
        processing: false,
        uploaded_uri: this.state.data_uri,
        creating: true,
        title: title,
        body: body
      });

      let data2 = {body: body, title: title, thumbnail: thumbnail, youtubeURL: videoURL, type: type};

      const promise2 = $.ajax({
          url: '/posts',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data2)          
        });
  }

  _submitTextPost = () => {

      let title = this.refs.titlet.getValue();
      let body = this.refs.descriptiont.getValue();
      let thumbnail = this.refs.thumbnailt.getValue();
      let type = this.state.type;

      this.setState({
        processing: false,
        uploaded_uri: this.state.data_uri,
        creating: true,
        title: title,
        body: body
      });


      let data3 = {body: body, title: title, thumbnail: thumbnail, type: type};

      const promise3 = $.ajax({
          url: '/posts',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data3)          
        });
  }


  render() {
    let processing;
    let uploaded;

    let informic = (
      <div style={{marginTop: '8%', width: '50%'}}>
        <Paper zDepth={2} style ={{backgroundColor: 'crimson', color: 'white'}}>
        <span>To complete and upload a file just go ahead and set your post with a title, a description(not too long, a video should suffice), and then thumbnail for the cover of your post/video. Lastly upload a video which should be in mp4 or ogg format.</span>
        </Paper>
        </div>
      );
    let renderedResult;
    let youtubeResult;
    let textResult;

    const style = {
    height: '420px',
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
  };

    if (this.state.uploaded_uri) {
      console.log("True");
      uploaded = (
        <div>
          <h4>Video uploaded!</h4>
          
          
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing video, hang tight";
    }

    if(this.state.creating == false) {
      renderedResult = (
        <div>
          <Paper style={style} zDepth={2}>
        
          
          
          
          <div className='col-sm-12'>
          <label>Upload an Video Pitch</label>
          <form id = "formData" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Title"  hintText="Enter Title of Pitch" ref = "title" name="title"/>
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} multiLine={true} rows={3} rowsMax={3} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} hintText="Enter the description here, this is a multiline text box input, 3 rows and your comment will be inputted" ref = "description" name="description"/>          
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Thumbnail"  hintText="Link to thumbnail image" ref = "thumbnail" name="thumbnail"/>          
          <br/>
            <input type="file" name="file" onChange={this.handleFile} />
            <br/>
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Submit" />
            {processing}
          </form>
          <br/>
          <LinearProgress mode="determinate" value={this.state.completed} style={{margin: '0 auto', textAlign: 'center' , width: "90%"}} />
        </div>
        {uploaded}
  </Paper>
  </div>
        );

     youtubeResult = (
        <div>
          <Paper style={style} zDepth={2}>
          <div className='col-sm-12'>
          <label>Upload an Video Pitch via Youtube</label>
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Title"  hintText="Enter Title of Pitch" ref = "titley" name="title"/>
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} multiLine={true} rows={3} rowsMax={3} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} hintText="Enter the description here, this is a multiline text box input, 3 rows and your comment will be inputted" ref = "descriptiony" name="description"/>          
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Youtube Video ID"  hintText="Youtube Video ID" ref = "youtubeid" name="youtubeid"/>          
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Thumbnail"  hintText="Link to thumbnail image" ref = "thumbnaily" name="thumbnail"/>          
          <br/>
          <RaisedButton primary={true} label="Submit Post" onTouchTap = {this._submitYoutubePost}></RaisedButton>
            {processing}
          
    
        </div>
        {uploaded}
  </Paper>
  </div>
      );

      textResult = (
        <div>
          <Paper style={style} zDepth={2}>
          <div className='col-sm-12'>
          <label>Upload an Text Pitch</label>
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Title"  hintText="Enter Title of Pitch" ref = "titlet" name="title"/>
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} multiLine={true} rows={3} rowsMax={3} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} hintText="Enter the description here, this is a multiline text box input, 3 rows and your comment will be inputted" ref = "descriptiont" name="description"/>          
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Thumbnail"  hintText="Link to thumbnail image" ref = "thumbnailt" name="thumbnail"/>          
          <br/>
          <RaisedButton primary={true} label="Submit Post" onTouchTap = {this._submitTextPost}></RaisedButton>
            {processing}
        </div>
        {uploaded}
  </Paper>
  </div>
        );
    } else {

      renderedResult = (
        <div>
        <Paper style={style} zDepth={2}>
        
          
          
          <h1>Post is complete!</h1>
          <h1>View Post here!</h1>
          <h4>{this.state.title}</h4>
          <h4>{this.state.body}</h4>
          <RaisedButton label="Create another pitch!" primary={true} onTouchTap={this._handleTouchTap}/>
          <br/>
          

        
  </Paper>
  </div>
        );

      youtubeResult = (
          <div>
        <Paper style={style} zDepth={2}>
        
          
          
          <h1>Post is complete!</h1>
          <h1>View Post here!</h1>
          <h4>{this.state.title}</h4>
          <h4>{this.state.body}</h4>
          <RaisedButton label="Create another pitch!" primary={true} onTouchTap={this._handleTouchTap}/>
          <br/>
          

        
  </Paper>
  </div>
        );

      textResult = (
          <div>
        <Paper style={style} zDepth={2}>
        
          
          
          <h1>Post is complete!</h1>
          <h1>View Post here!</h1>
          <h4>{this.state.title}</h4>
          <h4>{this.state.body}</h4>
          <RaisedButton label="Create another pitch!" primary={true} onTouchTap={this._handleTouchTap}/>
          <br/>
          

        
  </Paper>
  </div>
        );
    }

    return (

      
      <div style={{marginTop: '40px'}}>
      <div className={styles.row + ' ' + styles.row__group}>
      <div className = {styles.col + ' ' + styles.col__col312}>
      </div>
      <div className = {styles.col + ' ' + styles.col__col512}>
      <Tabs
       style={{backgroundColor: 'red'}}
       inkBarStyle={{color: '#333', backgroundColor: '#333'}}
      >
        <Tab label ="Upload Video" style={{backgroundColor: 'red'}} onClick ={() => this._handleVideoType('upload')}>
          {renderedResult}
        </Tab>
        <Tab label ="Select Youtube Video" style={{backgroundColor: 'red'}} onClick ={() => this._handleVideoType('youtube')}>
          {youtubeResult}
        </Tab>
        <Tab label ="Text Post" style={{backgroundColor: 'red'}} onClick ={() => this._handleVideoType('text')}>
          {textResult}
        </Tab>
      </Tabs>
  </div>
      <div className = {styles.col + ' ' +  styles.col__col212}>
      {informic}
      </div>

  </div>
  </div>
      
    );
  }
}

//opm 56ad434d940d27501f56dac9
//parkour 56ad436e940d27501f56db19
//opm funny moments 56ad4905d3c44588179ca419
//anime cool shit 56ad48f8d3c44588179ca1ed
