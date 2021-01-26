import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid d-flex justify-content-around'>
                <Link className='navbar-brand' to='/'>
                    Surface
                </Link>
                <Link className='nav-link' to='/login'>
                    Login
                </Link>
                <Link className='nav-link' to='/signup'>
                    Signup
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
