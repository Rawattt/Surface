import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='jumbotron'>
            <h2>
                The page you are looking for does not exist. Click{' '}
                <Link to='/'>here</Link>
            </h2>
        </div>
    );
};

export default NotFound;
