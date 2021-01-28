import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import moment from 'moment';

const Post = ({
    _id,
    title,
    body,
    imageUrl,
    likes,
    datetime,
    owner,
    username
}) => {
    const [user, dispatch] = useContext(StateContext);

    let liked = likes.indexOf(user.id) === -1;

    const likePost = async (id) => {
        try {
            dispatch({ type: 'LOADING' });
            const res = await axios.post(`/api/v1/post/like/${id}`);
            dispatch({ type: 'STOP_LOADING' });

            const { posts } = res.data.payload;
            dispatch({ type: 'SET_POST', payload: posts });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR' });
            }, 2000);
        }
    };
    const unlikePost = async (id) => {
        try {
            dispatch({ type: 'LOADING' });
            const res = await axios.post(`/api/v1/post/unlike/${id}`);
            dispatch({ type: 'STOP_LOADING' });

            console.log('res.data', res.data);
            const { posts } = res.data.payload;
            dispatch({ type: 'SET_POST', payload: posts });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'ERROR', payload: error.message });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR' });
            }, 2000);
        }
    };

    return (
        <div className='card my-2'>
            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <h5 className='card-text'>{body}</h5>
                <img
                    src={
                        imageUrl ||
                        'https://images.unsplash.com/photo-1609678816248-132228a8658b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80'
                    }
                    className='card-img-top'
                    alt='User Post'
                ></img>
                <h6>
                    By <Link to={`/profile/${owner}`}>{username}</Link>
                </h6>
                <p>
                    Posted on{' '}
                    {moment(datetime).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                <span>{likes.length} likes</span>
                {liked ? (
                    <button
                        className='btn btn-success mx-2'
                        onClick={() => likePost(_id)}
                    >
                        Like
                    </button>
                ) : (
                    <button
                        className='btn btn-danger mx-2'
                        onClick={() => unlikePost(_id)}
                    >
                        Unlike
                    </button>
                )}

                <Link to={`/post/${_id}`} className='mx-2'>
                    <button className='btn btn-info my-2'>Full post</button>
                </Link>
            </div>
        </div>
    );
};

export default React.memo(Post);
