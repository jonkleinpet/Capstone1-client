import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {

  render() {
    return (
      <div className='navbar'>
        <span className='nav-items'>
          <NavLink to='/about'>
            <div className='nav-item'>About</div>
          </NavLink>
        
          <NavLink to='/'>
            <div className='nav-item'>Home</div>
          </NavLink>
          <NavLink to='/read-up'>
            <div className='nav-item'>Read Up</div>
          </NavLink>
          <NavLink to='/blog'>
            <div>Blog</div>
          </NavLink>
        </span>
        <span className='login-reg-items'>
          <NavLink to='/login'>
            <div className='nav-item'>Login</div>
          </NavLink>

          <NavLink to='/register'>
            <div className='nav-item'>Register</div>
          </NavLink>
        </span>
      </div>
    )  
  }
}

export default Navbar;