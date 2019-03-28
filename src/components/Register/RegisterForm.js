import React, { Component } from 'react';
import RegisterError from './RegisterError';
import PostsContext from '../../context/context';
import "./styles/register-form.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      fullName: '',
      password: '',
      formValid: true,
      
    }
  } 

  static contextType = PostsContext;

  handleSubmit = (e) => {
    const userRegister = this.context;
    const { userName, fullName, password } = this.state;
    e.preventDefault();
    userRegister(userName, fullName, password)
      
    
  }

  updateUserName = (e) => {
    this.setState({ userName: e.target.value })
  }

  updateFullName = (e) => {
    this.setState({ fullName: e.target.value })
  }
  
  updatePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    const { isError, errorMessage } = this.props;
    return (
      <form className="register-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <h1>Register</h1>
        <label htmlFor="user-name">User Name: </label>
        <input type="text" id="user-name" name="user-name" placeholder="Laurie" required onChange={ (e) => this.updateUserName(e) } />
        <label htmlFor="full-name">Full Name: </label>
        <input type="text" id="full-name" name="full-name" required onChange={ (e) => this.updateFullName(e) } />
        <label htmlFor="user-password">Password: </label>
        <input type="password" id="user-password" name="password" required onChange={ (e) => this.updatePassword(e) } />
        <button type="submit">Submit</button>
        {
          isError
            ? <RegisterError message={ errorMessage } />
            : <></>
        }
      </form>
    )
  }

}

export default RegisterForm;