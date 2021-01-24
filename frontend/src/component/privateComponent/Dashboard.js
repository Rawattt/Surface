import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { StateContext } from '../StateProvider';
import AddPost from './AddPost';
import AllPosts from './AllPosts';

const Dashboard = () => {
    const [user, dispatch] = useContext(StateContext);

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch({ type: 'LOADING' });
            const res = await axios.get('/api/v1/dashboard');
            dispatch({ type: 'LOADING' });
            console.log(res.data);
            if (res.data.error) {
                dispatch({ type: 'AUTH_ERROR' });
            } else {
                const { id, posts } = res.data.payload;
                dispatch({
                    type: 'SET_USER',
                    payload: { id }
                });
                dispatch({ type: 'ADD_POST', payload: posts });
            }
        };
        fetchPosts();
    }, [dispatch]);

    return (
        <>
            <div>Dashboard</div>
            <AddPost />
            <AllPosts />
        </>
    );
};

export default Dashboard;
