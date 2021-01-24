import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StateContext } from '../component/StateProvider';

const Public = ({ component: Component, ...rest }) => {
    const [user] = useContext(StateContext);
    return (
        <Route
            {...rest}
            render={() =>
                user.isAuth ? <Redirect to='/dashboard' /> : <Component />
            }
        />
    );
};

export default Public;
