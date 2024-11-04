// Header.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className='Navigation-header'>
            <div className='Header-title'>StudentSaver</div>
            <nav className='Header-nav'>
                {/* Navigation links */}
                <ul className='Header-nav-list'> 
                    <li className='Header-nav-item'>
                        <NavLink to ='/' className='Header-nav-link' activeClassName='active'>Home</NavLink>
                    </li>
                    <li className='Header-nav-item'>
                        <NavLink to ='/trends' className='Header-nav-link' activeClassName='active'>Trends</NavLink>
                    </li>
                    <li className='Header-nav-item'>
                        <NavLink to ='/transactions' className='Header-nav-link' activeClassName='active'>Transactions</NavLink>
                    </li>
                    <li className='Header-nav-item'>
                        <NavLink to ='/budget' className='Header-nav-link' activeClassName='active'>Budget</NavLink>
                    </li>
                    <li className='Header-nav-item'>
                        <NavLink to ='/savings' className='Header-nav-link' activeClassName='active'>Savings</NavLink>
                    </li>
                    <li className='Header-nav-item'>
                        <NavLink to ='/settings' className='Header-nav-link' activeClassName='active'>Settings</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;