import React, { Component } from 'react';
import PostsContext from '../../context/context';
import CloudinaryWidget from './CloudinaryWidget';
import "./styles/post-form.css";

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      image: null
    }
  }
  
  static contextType = PostsContext;

  updateContent = (e) => {
    this.setState({ content: e.target.value })
  }

  updateImage = (e) => {
    this.setState({ image: e.target.value })
  }

  handleSubmit = (e) => {
    const { content } = this.state;
    const blogPost  = this.context;
    e.preventDefault();
    blogPost(content);
  }

  render() {

    return (
      <div className='post-form'>
        <form className='post-form' onSubmit={e => this.handleSubmit(e)}>
          <h2>Post Blog</h2>
          <textarea
            type='text'
            id='blog-post'
            name='blog-post'
            placeholder='Blog Post'
            wrap='soft'
            autoFocus={true}
            autoCapitalize='sentences'
            rows='20'
            cols='60'
            onChange={e => this.updateContent(e)}
            required
          />
            <button type='submit'>Submit</button>
            <CloudinaryWidget />
        </form>
      </div>
    );
  }

}

export default PostForm;