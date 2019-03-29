import React from 'react';
import './styles/comment-delete-button.css';
export default function CommentDeleteButton(props) {
  const { deleteComment, comment_id } = props;

  return (
    <>
      <button comment_id={comment_id} onClick={(e) => deleteComment(e) } className="comment-delete">X</button>
    </>
  )

};