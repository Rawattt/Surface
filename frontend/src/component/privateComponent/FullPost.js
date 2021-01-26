import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import moment from 'moment';
import FormComment from './FormComment';
import Comment from './Comment';

const FullPost = () => {
    const [user, dispatch] = useContext(StateContext);
    // const [data, setData] = useState({ post: {}, comments: [] });
    const { postId } = useParams();
    // const helper = (payload) =>
    //     setData({
    //         post: { ...payload.post },
    //         comments: [...payload.comments]
    //     });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                dispatch({ type: 'LOADING' });
                const res = await axios(`/api/v1/post/${postId}`);
                dispatch({ type: 'STOP_LOADING' });
                if (res.data.error) {
                    throw new Error(res.data.errorMessage);
                } else {
                    console.log(res.data);
                    dispatch({
                        type: 'FULL_POST',
                        payload: { ...res.data.payload.post }
                    });
                    dispatch({
                        type: 'COMMENTS',
                        payload: [...res.data.payload.comments]
                    });
                    console.log(user);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchPost();
    }, [dispatch, postId]);

    return (
        <>
            <Link to='/dashboard/1'>
                <button className='btn btn-primary my-2'>
                    Back to dashboard
                </button>
            </Link>
            <div className='card my-2' id={user.fullPost._id}>
                <div className='card-body'>
                    <h4 className='card-title'>{user.fullPost.title}</h4>
                    <h5 className='card-text'>{user.fullPost.body}</h5>
                    <h6>
                        By{' '}
                        <Link to={`/profile/${user.fullPost.owner}`}>
                            {user.fullPost.username}
                        </Link>
                    </h6>

                    <p>
                        Posted on{' '}
                        {moment(user.fullPost.datetime).format(
                            'MMMM Do YYYY, h:mm:ss a'
                        )}
                    </p>

                    <FormComment id={user.fullPost._id} />
                    {user.comments.map((comment) => (
                        <Comment {...comment} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FullPost;
