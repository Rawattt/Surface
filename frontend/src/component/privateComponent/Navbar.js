import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import axios from 'axios';

const Navbar = () => {
    const [user, dispatch] = useContext(StateContext);
    const history = useHistory();
    const signout = async () => {
        await axios.post('/api/v1/auth/signout');
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
    };
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link className='navbar-brand' to='/dashboard'>
                Surface
            </Link>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>

            <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent'
            >
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/dashboards'>
                            Profile
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <button className='btn btn-dark' onClick={signout}>
                            Signout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
