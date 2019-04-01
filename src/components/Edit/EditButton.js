import React from 'react';
import './styles/edit-button.css';

export default function EditButton(props) {
  const { history, getEditFormContent, content, title, post_id } = props;
  return (
    <div className="edit-button">
      <button post_id={post_id} content={content} title={title} onClick={
        (e) => getEditFormContent(e)
          .then(() => history.push('/blog/edit'))
      }>Edit</button>
    </div>
  )
}