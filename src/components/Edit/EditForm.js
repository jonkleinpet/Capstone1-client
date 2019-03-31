import React, { Component } from 'react';
import PostsContext from '../../context/context';
import './styles/edit-form.css';

export default class EditForm extends Component {

  static contextType = PostsContext;

  render() {

    const { editPost, editContent } = this.context;
    console.log(editContent, editPost)
    return (
      <div className='edit-form'>
        <form className='edit-form'>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' />
          <textarea
            placeholder='Blog Edit'
            wrap='soft'
            autoFocus={true}
            autoCapitalize='sentences'
            rows='20'
            cols='60'
          />
        </form>
      </div>
    );
  }

}