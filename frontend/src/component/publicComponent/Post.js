import React from 'react';
import moment from 'moment';

const Post = ({ _id, title, body, likes, time }) => {
    return (
        <div className='card my-2' id={_id}>
            <div className='card-body'>
                <h4 className='card-title'>{title}</h4>
                <h5 className='card-text'>{body}</h5>
                <p>{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <span className='my-2'>{likes.length} likes</span>
            </div>
        </div>
    );
};

export default React.memo(Post);
