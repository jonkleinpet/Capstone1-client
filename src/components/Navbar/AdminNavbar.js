import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import tokenService from '../../services/token-service';

class AdminNavbar extends Component {

  render() {
    const { toggleLogout } = this.props;

    const logout = () => {
      toggleLogout();
      tokenService.clearAuthToken();
    }

    const adminNavs = (
      <div className='navbar'>
        <span className='nav-items'>
          <NavLink to='/about'>
            <div className='nav-item'>About</div>
          </NavLink>
          <NavLink to='/'>
            <div className='nav-item'>Home</div>
          </NavLink>
          <NavLink to='/blog'>
            <div>Blog</div>
          </NavLink>
          
        </span>
        <span className='login-reg-items'>
          <NavLink to='/'>
            <div className='nav-item' onClick={ () => logout() }>Logout</div>
          </NavLink>
        </span>
      </div>
    );

    return (
      <>{ adminNavs }</>
    )
  }

}

export default AdminNavbar;