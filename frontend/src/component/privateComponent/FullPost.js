import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import moment from 'moment';
import FormComment from './FormComment';
import Comment from './Comment';

const FullPost = () => {
    const [user, dispatch] = useContext(StateContext);
    // const [data, setData] = useState({ post: {}, comments: [] });
    const { postId } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({ body: '' });
    const inputHandler = (e) => {
        setFormData({ body: e.target.value });
    };
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            let body = JSON.stringify(formData);
            const res = await axios.post(
                `/api/v1/post/comment/${user.fullPost._id}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
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
            }
            setFormData({ body: '' });
        } catch (error) {
            console.log(error);
        }
    };

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
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchPost();
    }, [dispatch, postId, history]);

    return (
        <>
            <div className='bg-light p-5 rounded-lg m-3'>
                <Link to='/dashboard/1'>
                    <button className='btn btn-primary my-2'>
                        Back to dashboard
                    </button>
                </Link>

                <div className='card my-2' id={user.fullPost._id}>
                    <div className='card-body'>
                        <h4 className='card-title'>{user.fullPost.title}</h4>
                        <h5 className='card-text'>{user.fullPost.body}</h5>
                        <img
                            src={
                                user.fullPost.imageUrl ||
                                'https://images.unsplash.com/photo-1609678816248-132228a8658b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80'
                            }
                            className='card-img-top'
                            alt='User Post'
                        ></img>
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
                        <form
                            className='my-2'
                            onSubmit={(e) => submitHandler(e)}
                        >
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    name='body'
                                    className='form-control'
                                    placeholder='Add comment'
                                    value={formData.body}
                                    onChange={(e) => inputHandler(e)}
                                    required
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Add comment
                            </button>
                        </form>
                        {/* <FormComment id={user.fullPost._id} /> */}
                        {user.comments.map((comment) => (
                            <Comment key={comment._id} {...comment} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullPost;
