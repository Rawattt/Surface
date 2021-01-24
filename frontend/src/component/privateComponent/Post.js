import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import moment from 'moment';

const Post = ({ _id, title, body, likes, datetime }) => {
    const [user, dispatch] = useContext(StateContext);

    let liked = likes.indexOf(user.id) === -1;

    const likePost = async (id) => {
        try {
            const res = await axios.post(`/api/v1/post/like/${id}`);

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
            const res = await axios.post(`/api/v1/post/unlike/${id}`);
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
        <div className='card my-2' id={_id}>
            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <h5 className='card-text'>{body}</h5>
                <p>{moment(datetime).format('MMMM Do YYYY, h:mm:ss a')}</p>
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
                <Link to='/profile/_id'>Profile</Link>
            </div>
        </div>
    );
};

export default React.memo(Post);
