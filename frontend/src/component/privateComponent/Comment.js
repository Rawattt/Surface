import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ from, fromUsername, body }) => {
    console.log(from);
    return (
        <>
            <div className='card-body'>
                <Link to={`/profile/${from}`}>
                    <h3 className='card-title'>{fromUsername}</h3>
                </Link>
                <h5 className='card-text'>{body}</h5>
            </div>
        </>
    );
};

export default React.memo(Comment);
