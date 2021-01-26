import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import AddPost from './AddPost';
import AllPosts from './AllPosts';

const Dashboard = () => {
    const [user, dispatch] = useContext(StateContext);
    const history = useHistory();
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                dispatch({ type: 'LOADING' });
                const res = await axios.get(`/api/v1/dashboard/${page}`);
                dispatch({ type: 'STOP_LOADING' });
                console.log(res.data);
                if (res.status === 403 || res.data.error) {
                    dispatch({ type: 'AUTH_ERROR' });
                    history.push('/login');
                } else {
                    const { id, posts, totalPosts } = res.data.payload;
                    dispatch({
                        type: 'SET_USER',
                        payload: { id }
                    });
                    dispatch({ type: 'ADD_POST', payload: posts });
                    dispatch({ type: 'LENGTH', payload: totalPosts });
                }
            } catch (error) {
                dispatch({ type: 'STOP_LOADING' });
                console.log(error);
                setTimeout(() => {
                    dispatch({ type: 'REMOVE_ERROR' });
                }, 2000);
                dispatch({ type: 'AUTH_ERROR' });
            }
        };
        fetchPosts();
    }, [dispatch, history, page]);

    return (
        <>
            <div className='bg-light px-5 py-1 rounded-lg m-3'>
                <div>Dashboard</div>
                <AddPost />
            </div>
            <div className='bg-light p-5 rounded-lg m-3'>
                <AllPosts />
                <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                        {page && page > 1 && (
                            <li className='page-item'>
                                <button
                                    className='page-link'
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </button>
                            </li>
                        )}
                        {parseInt(user.totalPosts) > parseInt(page) * 3 && (
                            <li className='page-item'>
                                <button
                                    className='page-link'
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Dashboard;
