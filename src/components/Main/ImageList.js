import React, { Component } from 'react';
import { Image } from 'cloudinary-react';

class ImageList extends Component {

  render() {
    
    const { images, postId } = this.props
    return (
      images.filter(img => img.id === postId).map((img, i) => {
        return (
          <div key={i}>
            <Image
              cloudName='jonklein'
              publicId={img.url} width="400">
              
            </Image>
          </div>
        );
      })
      
    )
  }

}

export default ImageList