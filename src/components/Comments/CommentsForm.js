import React, { Component } from 'react';
import PostsContext from "../../context/context";
import './comment-form.css';

class CommentsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      hidden: false
    }
}

  updateContent = (e) => {
    this.setState({ content: e.target.value });
  }

  handleSubmit = (e) => {
    const { content } = this.state;
    const { post_id, commentPost, toggleCommentForm } = this.props
    
    e.preventDefault()
    commentPost(content, post_id);
    toggleCommentForm()
      .then(this.setState({ hidden: !this.state.hidden }))
  }
  render() {
    
    return !this.state.hidden ? (
      <form className="comment-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <h3>Leave a Comment</h3>    
        <textarea
          type="text"
          id="comment-post"
          name="comment-post"
          placeholder="post comment"
          wrap="soft"
          autoFocus={ true }
          autoCapitalize="sentences"
          rows="10"
          cols="40"
          onChange={ (e) => this.updateContent(e) }
          required />
        <button type="submit">Submit</button>
      </form>
    ) : (
      <></>  
    )
  }
}

export default CommentsForm;