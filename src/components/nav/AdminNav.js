import React from "react";
import { NavLink } from 'react-router-dom';

const AdminNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
        <NavLink to="/admin/dashboard" className='nav-link' activeClassName="active">
                  Dashboard
             </NavLink>
            </li>

            <li className="nav-item">
        <NavLink to="/admin/product" className='nav-link' activeClassName="active">
                Product
             </NavLink>
            </li>

            <li className="nav-item">
        <NavLink to="/admin/products" className='nav-link' activeClassName="active">
                  Products
             </NavLink>
            </li>

            <li className="nav-item">
         <NavLink to="/admin/category" className='nav-link' activeClassName="active">
               Category
             </NavLink>
            </li>

            <li className="nav-item">
        <NavLink to="/admin/sub" className='nav-link' activeClassName="active">
        Subcategory
             </NavLink>
            </li>

            <li className="nav-item">
        <NavLink to="/admin/coupon" className='nav-link' activeClassName="active">
        Coupon
             </NavLink>
            </li>

            <li className="nav-item">
                {/* <Link to="/user/password" className="nav-link">
                    Password
        </Link> */}
         <NavLink to="/user/password" className='nav-link' activeClassName="active">
         Password
             </NavLink>
            </li>
        </ul>
    </nav>
);

export default AdminNav;


