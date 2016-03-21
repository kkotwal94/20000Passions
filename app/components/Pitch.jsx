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
      let data2 = {body: body, title: title, thumbnail: thumbnail};
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

  render() {
    let processing;
    let uploaded;

    let renderedResult;
    const style = {
    height: '400px',
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
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Description"  hintText="Enter description of pitch" ref = "description" name="description"/>          
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
    }

    return (

      
      <div style={{marginTop: '40px'}}>
      <div className={styles.row + ' ' + styles.row__group}>
      <div className = {styles.col + ' ' + styles.col__col312}>
      </div>
      <div className = {styles.col + ' ' + styles.col__col512}>
      {renderedResult}
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
