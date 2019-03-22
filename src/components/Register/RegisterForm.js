import React, { Component } from 'react';
import tokenService from "../../services/token-service";
import RegisterError from './RegisterError';
import config from "../../config";
import './register-form.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      fullName: '',
      password: '',
      formValid: true,
      isError: false,
      errorMessage: ''
    }
  } 

  handleSubmit = (e) => {
    this.setState({ isError: false });
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenService.getAuthToken()}`
      },

      body: JSON.stringify({
        user_name: this.state.userName,
        full_name: this.state.fullName,
        password: this.state.password
      })
    })
      .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    })
      .then(() => this.setState({ userName: '', fullName: '', password: '' }))
      .catch(res => {
        this.setState({
          isError: true,
          errorMessage: res.error
      })
    })
    

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
          this.state.isError
            ? <RegisterError message={ this.state.errorMessage } />
            : <></>
        }
      </form>
    )
  }

}

export default RegisterForm;