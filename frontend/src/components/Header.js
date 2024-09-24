// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className='Navigation-header'>
            <nav className='Header-nav'>
                {/* Navigation links */}
                <ul className='Header-nav-list'> 
                    <li className='Header-nav-item'>
                        <Link to ='/' className='Header-nav-link'>Home</Link>
                    </li>
                    <li className='Header-nav-item'>
                        <Link to ='/transactions' className='Header-nav-link'>Transactions</Link>
                    </li>
                    <li className='Header-nav-item'>
                        <Link to ='/goals' className='Header-nav-link'>Goals</Link>
                    </li>
                    <li className='Header-nav-item'>
                        <Link to ='/settings' className='Header-nav-link'>Settings</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;