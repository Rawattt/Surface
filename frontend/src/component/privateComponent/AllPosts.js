import React, { useContext } from 'react';
import { StateContext } from '../StateProvider';
import Post from './Post';
import ErrorBoundary from '../../utils/ErrorBoundary';

const AllPosts = () => {
    const [user] = useContext(StateContext);
    return (
        <div>
            {user.posts &&
                user.posts.length > 0 &&
                user.posts.map((post) => (
                    <ErrorBoundary key={post._id}>
                        <Post {...post} />
                    </ErrorBoundary>
                ))}
        </div>
    );
};

export default AllPosts;
