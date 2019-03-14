import React, { Component } from 'react';
import config from '../../config';
import './LoginForm.css';


class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      message: '',
      isError: false,
      formValid: false
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.API_KEY
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password
      })
    });
  }

  render() {
    
    
    return (
      <form className="login-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <label htmlFor="user-name">User Name: </label>
          <input type="text" id="user-name" name="user-name" placeholder="Laurie" required />
        <label htmlFor="user-password">Password: </label>
          <input type="password" id="user-password" name="password" required/>
        <button type="submit">Submit</button>
      </form>
    )
  }

}

export default LoginForm;