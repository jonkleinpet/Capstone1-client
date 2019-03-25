import React, { Component } from 'react';
import config from '../../config';
import tokenService from '../../services/token-service';
import "./styles/cloudinary-widget.css";

export default class CloudinaryWidget extends Component {

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({
      cloud_name: 'jonklein',
      upload_preset: 'capstone-blog-app',
      sources: ['local', 'url', 'raw'],
      folder: 'capstone'
    },
      (error, result) => {
        console.log(result)
        if (error) {
          console.log(error)
        }
        fetch(`${config.API_ENDPOINT}/cloudinary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenService.getAuthToken()}`
          },
          body: JSON.stringify(result[0])
        });
      })
  }

  render() {
    return (
      <div className="widget">
        <div>Upload an Image</div>
        <input type="button" value="Upload" onClick={ this.uploadWidget } />
      </div>
    )
  }
}