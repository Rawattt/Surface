import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StateContext } from '../component/StateProvider';

const Private = ({ component: Component, ...rest }) => {
    const [user] = useContext(StateContext);
    return (
        <Route
            {...rest}
            render={() =>
                user.isAuth ? <Component /> : <Redirect to='/login' />
            }
        />
    );
};

export default Private;
