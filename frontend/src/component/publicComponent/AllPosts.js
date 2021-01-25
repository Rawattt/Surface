import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { StateContext } from '../StateProvider';
import Post from './Post';

const AllPosts = () => {
    const [user, dispatch] = useContext(StateContext);
    useEffect(() => {
        const fetchPosts = async () => {
            dispatch({ type: 'LOADING' });
            const res = await axios.get('/api/v1/post');
            const posts = res.data.posts;
            console.log(posts);
            dispatch({ type: 'STOP_LOADING' });
            dispatch({ type: 'SET_POST', payload: [...posts] });
        };
        fetchPosts();
    }, [dispatch]);

    return (
        <>
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
        </>
    );
};

export default AllPosts;
