import React, { Component } from 'react';
import PostsContext from '../../context/context';
import "./styles/post-form.css";

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
  }
  
  static contextType = PostsContext;

  updateContent = (e) => {
    this.setState({ content: e.target.value })
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = (e) => {
    const { history } = this.props;
    const { content, title } = this.state;
    const blogPost  = this.context;
    e.preventDefault();
    blogPost(content, title).then(() => history.push('/'));
  }

  render() {
    
    return (
      <div className='post-form'>
        <form className='post-form' onSubmit={e => this.handleSubmit(e)}>
          <h2>Post Blog</h2>
          <label>Post Title: </label>
          <input className="title-input" type="text" name="title" id="title" onChange={ e => this.updateTitle(e) } required />
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
        </form>
      </div>
    );
  }

}

export default PostForm;