import React, { useContext, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import axios from 'axios';

const Navbar = () => {
    const [user, dispatch] = useContext(StateContext);
    const history = useHistory();
    const signout = async () => {
        try {
            await axios.post('/api/v1/auth/signout');
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
        } catch (error) {
            console.log('error in signout');
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
            window.location.reload();
        }
    };
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link className='navbar-brand' to='/dashboard/1'>
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
                        <button className='btn btn-dark nav-link'>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'white'
                                }}
                                to={`/profile/${user.id}`}
                            >
                                My Profile
                            </Link>
                        </button>
                    </li>

                    <li className='nav-item'>
                        <button
                            className='btn btn-dark nav-link'
                            onClick={signout}
                        >
                            Signout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Navbar);
