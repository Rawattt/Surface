import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { StateContext } from '../StateProvider';
import Post from './Post';

const AllPosts = () => {
    const [user, dispatch] = useContext(StateContext);
    const page = parseInt(useParams().page) || 1;

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch({ type: 'LOADING' });
            const res = await axios.get(`/api/v1/post?page=${page}`);
            const posts = res.data.posts;
            console.log(posts);

            dispatch({ type: 'STOP_LOADING' });
            dispatch({ type: 'SET_POST', payload: [...posts] });
            dispatch({ type: 'LENGTH', payload: res.data.totalPosts });
        };
        fetchPosts();
    }, [dispatch, page]);

    return (
        <>
            <div className='bg-light p-5 rounded-lg m-3'>
                {user.posts.map((post) => (
                    <Post
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        body={post.body}
                        likes={[...post.likes]}
                        time={post.datetime}
                    />
                ))}
                <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                        {page > 1 && (
                            <li className='page-item'>
                                <Link className='page-link' to={`/${page - 1}`}>
                                    Previous
                                </Link>
                            </li>
                        )}
                        {parseInt(user.totalPosts) > parseInt(page) * 3 && (
                            <li className='page-item'>
                                <Link className='page-link' to={`/${page + 1}`}>
                                    Next
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AllPosts;
