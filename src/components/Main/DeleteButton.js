import React from 'react';
import './styles/delete-button.css';

export default function DeleteButton(props) {
  const { deletePost, post_id } = props;
  return (
    <div className="delete-btn">
      <button id={ post_id } onClick={ (e) => deletePost(e) }>Delete Post</button>
    </div>
  )

};