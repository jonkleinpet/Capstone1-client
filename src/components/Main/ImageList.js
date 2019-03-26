import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import './styles/image-list.css';

class ImageList extends Component {
  
  render() {  
    const { images, postId } = this.props
    return (
      images.filter(img => img.post_id === postId).map((img, i) => {
        return (
          <div className="img-container" key={i}>
            <Image
              cloudName='jonklein'
              publicId={ img.url } width="550">
            </Image>
          </div>
        );
      })
    )
  }

}

export default ImageList