import React, { Component } from 'react';
import config from '../../config';
import tokenService from '../../services/token-service';
import "./styles/cloudinary-widget.css";

export default class CloudinaryWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      emptyResult: false
    }
  }
  uploadWidget = () => {
    const { post_id, imagePost } = this.props;
    
      window.cloudinary.openUploadWidget({
        cloud_name: 'jonklein',
        upload_preset: 'capstone-blog-app',
        sources: ['local', 'url', 'raw'],
        folder: 'capstone'
      },
        (error, result) => {
          if (error) {
            this.setState({errorMsg: error.message})
          }
          
          // prevent error when user exits widget without uploading
          try {
            const { url, public_id } = result[0];
            const newImage = {
              public_id,
              post_id,
              url
            };
            fetch(`${config.API_ENDPOINT}/cloudinary`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenService.getAuthToken()}`
              },
              body: JSON.stringify(newImage)
            })
              .then(newImage => newImage.json())
              .then(newImage => {
                imagePost(newImage);
              })
              .catch(err => console.log(err))
          }

          catch (err) {
            this.setState({ emptyResult: true });
          }
         
        }) 
  }

  render() {
    return (
      !this.state.emptyResult
        ? <div className="widget">
            <div>Add an image to this post</div>
            <input type="button" value="Upload" onClick={ this.uploadWidget } />
          </div>
        : <div className="widget">
            <div>Add an image to this post</div>
            <input type="button" value="Upload" onClick={ this.uploadWidget } />
          </div>
    )
  }
}