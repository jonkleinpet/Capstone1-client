import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import tokenService from '../../services/token-service';
import AdminNavbar from '../../components/Navbar/AdminNavbar';
import "./styles/Navbar.css";

class Navbar extends Component {
  
  render() {
    const { toggleLogout } = this.props;
    
    const logout = () => {
      toggleLogout(false);
      tokenService.clearAuthToken();
    }
    
    const navbar = (
      <div className='navbar'>
        <span className='nav-items'>
          <NavLink to='/about'>
            <div className='nav-item'>About</div>
          </NavLink>
          <Link to='/dashboard'>
            <div className='nav-item'>Home</div>
          </Link>
        </span>

        <span className='login-reg-items'>
          { tokenService.hasAuthToken()
            ? <Link to='/dashboard'>
              <div className='nav-item' onClick={ () => logout() }>Logout</div>
            </Link>

            : <>
              <NavLink to='/login'>
                <div className='nav-item'>Login</div>
              </NavLink>
              <NavLink to='/register'>
                <div className='nav-item'>Register</div>
              </NavLink>
            </>
          }
        </span>
      </div>
    );

    return (
      
      // check user is logged in and is admin
      tokenService.hasAuthToken() && tokenService.isAdmin()
      ? <>
          <AdminNavbar toggleLogout={ toggleLogout }/>
        </>
      : <>
          {navbar}
        </>    
    )  
  }
}

export default Navbar;