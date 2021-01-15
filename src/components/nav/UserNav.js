import React from "react";
import { NavLink } from 'react-router-dom';

const UserNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
         <NavLink to="/user/history" className='nav-link' activeClassName="active">
         History
             </NavLink>
            </li>

            <li className="nav-item">
        <NavLink to="/user/password" className='nav-link' activeClassName="active">
        Password
             </NavLink>
            </li>

            <li className="nav-item">
          <NavLink to="/user/wishlist" className='nav-link' activeClassName="active">
          Wishlist
             </NavLink>
            </li>
        </ul>
    </nav>
);

export default UserNav;
