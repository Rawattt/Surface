import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import Post from './Post';

const Profile = () => {
    const [user, dispatch] = useContext(StateContext);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch({ type: 'LOADING' });
                const { data } = await axios.get(`/api/v1/profile/${id}`);
                dispatch({ type: 'STOP_LOADING' });
                console.log(data);
                dispatch({ type: 'SET_PROFILE', payload: { ...data.payload } });
            } catch (error) {
                dispatch({ type: 'ERROR', payload: error.message });
                setTimeout(() => {
                    dispatch({ type: 'REMOVE_ERROR' });
                }, 2000);
            }
        };
        fetchUser();
    }, [dispatch, id]);

    const followHandler = async () => {
        try {
            dispatch({ type: 'LOADING' });
            const res = await axios.post(
                `/api/v1/follow/${user.profile.username}`
            );
            dispatch({ type: 'STOP_LOADING' });
            if (res.data.error) throw new Error(res.data.errorMessage);
            else {
                dispatch({
                    type: 'SET_PROFILE',
                    payload: {
                        followers: res.data.followers,
                        isFollowing: true
                    }
                });
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR' });
            }, 2000);
        }
    };
    const unfollowHandler = async () => {
        try {
            dispatch({ type: 'LOADING' });
            const res = await axios.post(
                `/api/v1/unfollow/${user.profile.username}`
            );
            dispatch({ type: 'STOP_LOADING' });
            if (res.data.error) throw new Error(res.data.errorMessage);
            else {
                dispatch({
                    type: 'SET_PROFILE',
                    payload: {
                        followers: res.data.followers,
                        isFollowing: false
                    }
                });
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR' });
            }, 2000);
        }
    };

    return (
        <div className='bg-light p-5 rounded-lg m-3'>
            <Link to='/dashboard/1' className='btn btn-primary my-3'>
                Back to dashboard
            </Link>
            <div>
                <div className='card my-2'>
                    <div className='card-body'>
                        <h3 className='text-center'>{user.profile.name}</h3>
                        <h3 className='text-center'>{user.profile.username}</h3>
                        <h5 className='text-center'>
                            Followers: {user.profile.followers}
                        </h5>
                        <h5 className='text-center'>
                            Following: {user.profile.following}
                        </h5>
                        {user.username === user.profile.username ? null : user
                              .profile.isFollowing ? (
                            <button
                                className='btn btn-success'
                                onClick={unfollowHandler}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                className='btn btn-dark'
                                onClick={followHandler}
                            >
                                Follow
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {user.profile.posts?.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    );
};

export default Profile;
