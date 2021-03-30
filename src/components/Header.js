import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// import './Header.css';

const Header = (props) => {
    const {user} = props;

  
    return (
      <header>
        <h1>Warehouse Manager</h1>
        <form 
          className="user-select" 
          >
            <NavLink to="/" activeClassName="current"> Home |</NavLink>
            <NavLink to="/search" activeClassName="current"> Search |</NavLink>
            <NavLink to="/create" activeClassName="current"> Create Product |</NavLink >
          { 
            user.username
            ? <> 
                <NavLink to="/logout" activeClassName="current"> Log Out </NavLink >
                
              </>
            : <>
                <NavLink to="/login" activeClassName="current">Login </NavLink>
                <NavLink to="/register" activeClassName="current">Register </NavLink >
              </>
          }
        </form>
      </header>
    );
  }
  
  export default Header;