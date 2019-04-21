import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import tokenService from '../../services/token-service';
import './styles/Navbar.css';

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
          <Link to='/dashboard'>
            <div className='nav-item'>Home</div>
          </Link>
          <NavLink to='/blog'>
            <div className='nav-item'>Blog</div>
          </NavLink>
        </span>
        <span className='login-reg-items'>
          <Link to='/dashboard'>
            <div className='nav-item' onClick={() => logout()}>
              Logout
            </div>
          </Link>
        </span>
      </div>
    );

    return (
      <>{ adminNavs }</>
    )
  }

}

export default AdminNavbar;