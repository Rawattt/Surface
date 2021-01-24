import React, { useContext } from 'react';
import { StateContext } from '../component/StateProvider';

const Error = () => {
    const [user] = useContext(StateContext);

    return (
        user.error && (
            <div
                className='alert alert-danger alert-dismissible fade show'
                role='alert'
            >
                {user.errorMessage}
            </div>
        )
    );
};

export default Error;
