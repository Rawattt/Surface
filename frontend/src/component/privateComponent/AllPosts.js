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
                        <Post
                            {...post}
                            imageUrl={
                                post.imageUrl ||
                                'https://firebasestorage.googleapis.com/v0/b/surface-image.appspot.com/o/images%2F600cf3922e3f5f2bdc7c8e9f-1611853330184-post.jpg?alt=media&token=05e030fa-1a43-4616-9de8-8dae75a2ccf1'
                            }
                        />
                    </ErrorBoundary>
                ))}
        </div>
    );
};

export default AllPosts;
