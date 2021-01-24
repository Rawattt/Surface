import React, { useContext } from 'react';
import Navbar from './publicComponent/Navbar';
import AuthNavbar from './privateComponent/Navbar';
import { StateContext } from './StateProvider';

const MainNav = () => {
    const [user, dispatch] = useContext(StateContext);
    return user.isAuth ? <AuthNavbar /> : <Navbar />;
};

export default MainNav;
