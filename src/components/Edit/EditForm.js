import React, { Component } from 'react';

export default class EditForm extends Component {

  render() {
    return (
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <textarea
          placeholder='Blog Edit'
          wrap='soft'
          autoFocus={ true }
          autoCapitalize='sentences'
          rows='20'
          cols='60' />
      </form>
    )
  }

}