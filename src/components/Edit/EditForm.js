import React, { Component } from 'react';
import PostsContext from '../../context/context';
import './styles/edit-form.css';

export default class EditForm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      title: '',
      content: ''
    }
  }
  static contextType = PostsContext;

  componentDidMount() {
    const { editContent, editTitle } = this.context;
    const textArea = document.getElementById('edit-content');
    const titleInput = document.getElementById('title');
    this.setState({
      title: editTitle,
      content: editContent
    }, () => {
      textArea.value = this.state.content;
      titleInput.value = this.state.title;
      });
  };

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  updateContent = (e) => {
    this.setState({ content: e.target.value });
  }

  handleSubmit = (e) => {
    const { editPost, editPostId } = this.context;
    const { title, content } = this.state;
    const { history } = this.props;
    e.preventDefault();
    editPost(editPostId, content, title)
      .then(() => history.push('/'));
  }

  render() {
    return (
      <div className='edit-form'>
        <form onSubmit={(e) => this.handleSubmit(e)} className='edit-form'>
          <label htmlFor='title'>Title</label>
          <input onChange={(e) => this.updateTitle(e)} type='text' name='title' id='title' />
          <textarea
            onChange={(e) => this.updateContent(e)}
            id="edit-content"
            placeholder='Blog Edit'
            wrap='soft'
            autoFocus={true}
            autoCapitalize='sentences'
            rows='20'
            cols='60'
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

}