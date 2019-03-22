import React, { Component } from 'react';
import CommentsForm from "./CommentsForm";
import './comment-button.css';

class CommentButton extends Component {
  state = {
    hidden: true
  };

  toggleCommentForm = async () => {
    await this.setState({ hidden: !this.state.hidden });
}
  
  render() {
    const { post_id, commentPost } = this.props;

    return this.state.hidden ? (
      <button onClick={ () => this.toggleCommentForm()}>Comment</button>
    ) : (
      <div>
        <button onClick={ () => this.toggleCommentForm()}>Comment</button>
          <CommentsForm toggleCommentForm={this.toggleCommentForm} commentPost={commentPost} post_id={ post_id } />
      </div>
    );
  }
}

export default CommentButton;