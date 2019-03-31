import React from 'react';
import './styles/edit-button.css';

export default function EditButton(props) {
  const { history, getEditFormContent, content } = props;
  console.log(getEditFormContent)
  return (
    <div className="edit-button">
      <button content={content} onClick={
        (e) => getEditFormContent(e)
          .then(() => history.push('/blog/edit'))
      }>Edit</button>
    </div>
  )
}