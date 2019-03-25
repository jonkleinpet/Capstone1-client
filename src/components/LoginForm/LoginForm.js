import React, { Component } from 'react';
import PostsContext from '../../context/context';
import LoginError from './LoginError';
import "./styles/LoginForm.css";


class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      message: '',
      formValid: false
    }
  }

  static contextType = PostsContext;

  updateName = (e) => {
    this.setState({ name: e.target.value });
  };

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = this.state;
    const userLogin = this.context;
    userLogin(name, password);
    
  };

  render() {
    const { isError, errorMessage } = this.props;
    return (
      <form className="login-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <h1>Log In</h1>
      <label htmlFor="user-name">User Name: </label>
      <input type="text" id="user-name" name="user-name" placeholder="Laurie" autoComplete="off" required onChange={ (e) => this.updateName(e) }/>
      <label htmlFor="user-password">Password: </label>
        <input type="password" id="user-password" name="password" required onChange={ (e) => this.updatePassword(e) } />
        <button type="submit">Submit</button>
        {
          isError
            ? <LoginError message={ errorMessage } />
            : <></>
        }
      </form>
      
        
    )
  }

}

export default LoginForm;