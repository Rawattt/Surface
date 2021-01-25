import React, { useContext, useEffect } from 'react';
import { StateContext } from '../StateProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const [user, dispatch] = useContext(StateContext);
    useEffect(() => {
        const getProfile = async () => {
            try {
                dispatch({ type: 'LOADING' });
                const res = await axios.get(`/api/v1/profile/${user.id}`);
                dispatch({ type: 'STOP_LOADING' });
                if (res.data.error) {
                    throw new Error(res.data.errorMessage);
                } else {
                    dispatch({
                        type: 'SET_PROFILE',
                        payload: res.data.payload
                    });
                }
                return res.data;
            } catch (error) {
                dispatch({ type: 'ERROR', payload: error.message });
                setTimeout(() => {
                    dispatch({ type: 'REMOVE_ERROR' });
                }, 2000);
            }
        };
        let data = getProfile();
        console.log(data);
    }, [dispatch]);
    return (
        <>
            <Link to='/dashboard' className='btn btn-primary'>
                Dashboard
            </Link>
            <h3>{user.profile.name}</h3>
            <h5>Followers: {user.profile.followers}</h5>
            <h5>Following: {user.profile.following}</h5>
        </>
    );
};

export default MyProfile;
