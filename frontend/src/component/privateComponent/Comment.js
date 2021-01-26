import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ owner, fromUsername, body }) => {
    return (
        <>
            <div className='card-body'>
                <Link to={`/profile/${owner}`}>
                    <h3 className='card-title'>{fromUsername}</h3>
                </Link>
                <h5 className='card-text'>{body}</h5>
            </div>
        </>
    );
};

export default React.memo(Comment);
